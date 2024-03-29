package database

import (
	"context"
	"fmt"
	"io/fs"
	"log"
	"os"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/exp/slices"
)

type Migrations struct {
	ID        uint `gorm:"primaryKey"`
	File      string
	CreatedAt time.Time
}

const (
	migrationsBasePath = "./db/migrations/"
)

func Migrate() error {
	_, err := Conn.Exec(context.Background(), "CREATE TABLE IF NOT EXISTS migrations (id SERIAL PRIMARY KEY, file VARCHAR NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT NOW())")
	if err != nil {
		return err
	}

	executedMiigrationFiles := getExistingMigrations(Conn)
	files := getMigrationFiles(migrationsBasePath)

	for _, file := range files {
		if strings.Contains(file.Name(), ".sql") && !slices.Contains(executedMiigrationFiles, file.Name()) {
			runMigrationFile(Conn, migrationsBasePath, file)
		}
	}

	return nil
}

func getExistingMigrations(db *pgxpool.Pool) []string {
	var executedMiigrationFiles []string
	rows, err := db.Query(context.Background(), "SELECT * FROM migrations")
	if err != nil {
		return nil
	}

	res, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[Migrations])
	if err != nil {
		return nil
	}

	for _, row := range res {
		executedMiigrationFiles = append(executedMiigrationFiles, row.File)
	}

	return executedMiigrationFiles
}

func getMigrationFiles(basePath string) []fs.DirEntry {
	files, err := os.ReadDir(basePath)
	if err != nil {
		log.Fatal(err)
		return nil
	}
	return files
}

func runMigrationFile(db *pgxpool.Pool, basePath string, file fs.DirEntry) {
	f, err := os.ReadFile(basePath + file.Name())
	if err != nil {
		log.Println(err)
	}

	fmt.Print("Running migration for: ", file.Name())
	_, err = db.Exec(context.Background(), string(f))
	if err != nil {
		panic("Could not run migration: " + file.Name())
	}

	fmt.Print(" -")
	fmt.Println(string("\033[32m"), "[OK]", string("\033[0m"))

	_, err = db.Exec(context.Background(), "INSERT INTO migrations (file, created_at) VALUES ($1, $2)", file.Name(), time.Now())
	if err != nil {
		panic("Could not update migration table with executed migration: " + file.Name())
	}
}

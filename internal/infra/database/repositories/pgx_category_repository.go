package repositories

import (
	"context"

	"github.com/buemura/my-fin/internal/domain/category"
	"github.com/buemura/my-fin/internal/infra/database"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgxCategoryRepository struct {
	db *pgxpool.Pool
}

func NewPgxCategoryRepository() *PgxCategoryRepository {
	return &PgxCategoryRepository{
		db: database.Conn,
	}
}

func (r *PgxCategoryRepository) FindById(id string) (*category.Category, error) {
	rows, err := r.db.Query(context.Background(), `SELECT * FROM category WHERE id = $1`, id)
	if err != nil {
		return nil, err
	}

	res, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[category.Category])
	if err != nil {
		return nil, err
	}

	if len(res) == 0 {
		return nil, nil
	}
	return res[0], nil
}

func (r *PgxCategoryRepository) FindMany() ([]*category.Category, error) {
	rows, err := r.db.Query(context.Background(), `SELECT * FROM category`)
	if err != nil {
		return nil, err
	}

	res, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[category.Category])
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (r *PgxCategoryRepository) Save(in *category.Category) (*category.Category, error) {
	_, err := r.db.Exec(
		context.Background(),
		`INSERT INTO category (id, name, type) VALUES ($1, $2, $3)`,
		in.ID, in.Name, in.Type,
	)
	if err != nil {
		return nil, err
	}
	return in, nil
}

func (r *PgxCategoryRepository) Delete(categoryId string) error {
	_, err := r.db.Exec(
		context.Background(),
		`DELETE FROM category WHERE id = $1`,
		categoryId,
	)
	if err != nil {
		return err
	}
	return nil
}

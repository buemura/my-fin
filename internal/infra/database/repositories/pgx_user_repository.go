package repositories

import (
	"context"

	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/buemura/my-fin/internal/infra/database"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgxUserRepository struct {
	db *pgxpool.Pool
}

func NewPgxUserRepository() *PgxUserRepository {
	return &PgxUserRepository{
		db: database.Conn,
	}
}

func (r *PgxUserRepository) FindById(id string) (*user.User, error) {
	rows, err := r.db.Query(context.Background(), `SELECT * FROM public.user WHERE id = $1`, id)
	if err != nil {
		return nil, err
	}

	u, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[user.User])
	if err != nil {
		return nil, err
	}

	if len(u) == 0 {
		return nil, nil
	}
	return u[0], nil
}

func (r *PgxUserRepository) FindByEmail(email string) (*user.User, error) {
	rows, err := r.db.Query(context.Background(), `SELECT * FROM public.user WHERE email = $1`, email)
	if err != nil {
		return nil, err
	}

	u, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[user.User])
	if err != nil {
		return nil, err
	}

	if len(u) == 0 {
		return nil, nil
	}
	return u[0], nil
}

func (r *PgxUserRepository) Save(usr *user.User) (*user.User, error) {
	_, err := r.db.Exec(
		context.Background(),
		`INSERT INTO public.user (id, name, email, password, created_at) VALUES ($1, $2, $3, $4, $5)`,
		usr.ID, usr.Name, usr.Email, usr.Password, usr.CreatedAt,
	)
	if err != nil {
		return nil, err
	}
	return usr, nil
}

func (r *PgxUserRepository) Delete(userID string) error {
	_, err := r.db.Exec(
		context.Background(),
		`DELETE FROM public.user WHERE id = $1`,
		userID,
	)
	if err != nil {
		return err
	}
	return nil
}

package repositories

import (
	"context"

	"github.com/buemura/my-fin/internal/domain/transaction"
	"github.com/buemura/my-fin/internal/infra/database"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgxTransactionRepository struct {
	db *pgxpool.Pool
}

func NewPgxTransactionRepository() *PgxTransactionRepository {
	return &PgxTransactionRepository{
		db: database.Conn,
	}
}

// TODO: Implement this properly
func (r *PgxTransactionRepository) FindMany(opts transaction.FindManyOpts) ([]*transaction.Transaction, error) {
	rows, err := r.db.Query(
		context.Background(),
		`SELECT * FROM transaction WHERE user_id = $1 OFFSET $2 LIMIT $3`,
		opts.UserId, opts.Offset, opts.Limit,
	)
	if err != nil {
		return nil, err
	}

	res, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[transaction.Transaction])
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (r *PgxTransactionRepository) FindById(id string) (*transaction.Transaction, error) {
	rows, err := r.db.Query(context.Background(), `SELECT * FROM transaction WHERE id = $1`, id)
	if err != nil {
		return nil, err
	}

	res, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[transaction.Transaction])
	if err != nil {
		return nil, err
	}

	if len(res) == 0 {
		return nil, nil
	}
	return res[0], nil
}

func (r *PgxTransactionRepository) Save(in *transaction.Transaction) (*transaction.Transaction, error) {
	_, err := r.db.Exec(
		context.Background(),
		`INSERT INTO transaction (id, user_id, account_id, category_id, name, amount, type, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
		in.ID, in.UserId, in.AccountId, in.CategoryId, in.Name, in.Amount, in.Type, in.Date,
	)
	if err != nil {
		return nil, err
	}
	return in, nil
}

func (r *PgxTransactionRepository) Delete(transactionId string) error {
	_, err := r.db.Exec(
		context.Background(),
		`DELETE FROM transaction WHERE id = $1`,
		transactionId,
	)
	if err != nil {
		return err
	}
	return nil
}

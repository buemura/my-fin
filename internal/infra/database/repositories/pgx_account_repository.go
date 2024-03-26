package repositories

import (
	"context"

	"github.com/buemura/my-fin/internal/domain/account"
	"github.com/buemura/my-fin/internal/infra/database"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgxAccountRepository struct {
	db *pgxpool.Pool
}

func NewPgxAccountRepository() *PgxAccountRepository {
	return &PgxAccountRepository{
		db: database.Conn,
	}
}

func (r *PgxAccountRepository) FindById(id string) (*account.Account, error) {
	rows, err := r.db.Query(context.Background(), `SELECT * FROM public.account WHERE id = $1`, id)
	if err != nil {
		return nil, err
	}

	res, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[account.Account])
	if err != nil {
		return nil, err
	}

	if len(res) == 0 {
		return nil, nil
	}
	return res[0], nil
}

func (r *PgxAccountRepository) FindByUserId(userId string, offset, limit int) ([]*account.Account, error) {
	rows, err := r.db.Query(context.Background(), `SELECT * FROM public.account WHERE user_id = $1 OFFSET $2 LIMIT $3`, userId, offset, limit)
	if err != nil {
		return nil, err
	}

	res, err := pgx.CollectRows(rows, pgx.RowToAddrOfStructByPos[account.Account])
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (r *PgxAccountRepository) GetTotalsByUserId(userId string) (*account.AccountTotals, error) {
	var totalBalance, totalItems int

	err := r.db.QueryRow(
		context.Background(),
		"SELECT SUM(balance) as total_balance, COUNT(id) AS total_items FROM public.account WHERE user_id = $1",
		userId,
	).Scan(&totalBalance, &totalItems)
	if err != nil {
		return nil, err
	}

	return &account.AccountTotals{
		TotalBalance: totalBalance,
		TotalItems:   totalBalance,
	}, nil
}

func (r *PgxAccountRepository) Save(acc *account.Account) (*account.Account, error) {
	_, err := r.db.Exec(
		context.Background(),
		`INSERT INTO public.account (id, user_id, name, balance, color, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
		acc.ID, acc.UserId, acc.Name, acc.Balance, acc.Color, acc.CreatedAt, acc.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return acc, nil
}

func (r *PgxAccountRepository) Update(acc *account.Account) (*account.Account, error) {
	_, err := r.db.Exec(
		context.Background(),
		`UPDATE public.account SET name = $1, balance = $2, color = $3, updated_at = $4 WHERE id = $5`,
		acc.Name, acc.Balance, acc.Color, acc.UpdatedAt, acc.ID,
	)
	if err != nil {
		return nil, err
	}
	return acc, nil
}

func (r *PgxAccountRepository) Delete(accountId string) error {
	_, err := r.db.Exec(
		context.Background(),
		`DELETE FROM public.account WHERE id = $1`,
		accountId,
	)
	if err != nil {
		return err
	}
	return nil
}

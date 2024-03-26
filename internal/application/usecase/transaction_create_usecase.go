package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/transaction"
)

type TransactionCreateUsecase struct {
	repo transaction.TransactionRepository
}

func NewTransactionCreateUsecase(repo transaction.TransactionRepository) *TransactionCreateUsecase {
	return &TransactionCreateUsecase{
		repo: repo,
	}
}

func (u *TransactionCreateUsecase) Execute(input transaction.TransactionCreateIn) (*transaction.Transaction, error) {
	slog.Info("[TransactionCreateUsecase.Execute] - Create transaction for account:" + input.AccountId)
	t, err := transaction.NewTransaction(input)
	if err != nil {
		return nil, err
	}

	res, err := u.repo.Save(t)
	if err != nil {
		return nil, err
	}
	return res, nil
}

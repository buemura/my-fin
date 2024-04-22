package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/transaction"
)

type TransactionUpdateUsecase struct {
	repo transaction.TransactionRepository
}

func NewTransactionUpdateUsecase(repo transaction.TransactionRepository) *TransactionUpdateUsecase {
	return &TransactionUpdateUsecase{
		repo: repo,
	}
}

func (u *TransactionUpdateUsecase) Execute(trx *transaction.Transaction) (*transaction.Transaction, error) {
	slog.Info("[TransactionUpdateUsecase.Execute] - Update transaction:" + trx.ID)
	res, err := u.repo.Update(trx)
	if err != nil {
		return nil, err
	}
	return res, nil
}

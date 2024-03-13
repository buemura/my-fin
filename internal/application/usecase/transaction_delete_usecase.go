package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/transaction"
)

type TransactionDeleteUsecase struct {
	repo transaction.TransactionRepository
}

func NewTransactionDeleteUsecase(repo transaction.TransactionRepository) *TransactionDeleteUsecase {
	return &TransactionDeleteUsecase{
		repo: repo,
	}
}

func (u *TransactionDeleteUsecase) Execute(transactionId string) error {
	slog.Info("[TransactionDeleteUsecase.Execute] - Delete transaction: " + transactionId)
	err := u.repo.Delete(transactionId)
	if err != nil {
		return err
	}
	return nil
}

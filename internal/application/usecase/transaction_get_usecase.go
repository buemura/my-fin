package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/transaction"
)

type TransactionGetUsecase struct {
	repo transaction.TransactionRepository
}

func NewTransactionGetUsecase(repo transaction.TransactionRepository) *TransactionGetUsecase {
	return &TransactionGetUsecase{
		repo: repo,
	}
}

func (u *TransactionGetUsecase) Execute(transactionId string) (*transaction.Transaction, error) {
	slog.Info("[TransactionGetUsecase.Execute] - Get transaction:" + transactionId)
	trx, err := u.repo.FindById(transactionId)
	if err != nil {
		return nil, err
	}
	return trx, nil
}

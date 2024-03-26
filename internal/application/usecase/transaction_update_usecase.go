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

func (u *TransactionUpdateUsecase) Execute(transactionId string, input transaction.TransactionUpdateIn) (*transaction.Transaction, error) {
	slog.Info("[TransactionUpdateUsecase.Execute] - Update transaction:" + transactionId)
	trx, err := u.repo.FindById(transactionId)
	if err != nil {
		return nil, err
	}

	if input.AccountId != nil {
		trx.AccountId = *input.AccountId
	}
	if input.CategoryId != nil {
		trx.CategoryId = *input.CategoryId
	}
	if input.Name != nil {
		trx.Name = *input.Name
	}
	if input.Amount != nil {
		trx.Amount = *input.Amount
	}
	if input.Type != nil {
		trx.Type = *input.Type
	}
	if input.Date != nil {
		trx.Date = *input.Date
	}

	res, err := u.repo.Save(trx)
	if err != nil {
		return nil, err
	}
	return res, nil
}

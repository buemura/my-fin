package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/transaction"
)

type TransactionListUsecase struct {
	repo transaction.TransactionRepository
}

func NewTransactionListUsecase(repo transaction.TransactionRepository) *TransactionListUsecase {
	return &TransactionListUsecase{
		repo: repo,
	}
}

func (u *TransactionListUsecase) Execute(opts transaction.TransactionListIn) ([]*transaction.Transaction, error) {
	slog.Info("[TransactionListUsecase.Execute] - Get transactions for user:" + opts.UserId)
	params := getTransactionSearchParam(opts)
	trxs, err := u.repo.FindMany(params)
	if err != nil {
		return nil, err
	}
	return trxs, nil
}

func getTransactionSearchParam(request transaction.TransactionListIn) transaction.FindManyOpts {
	var opts transaction.FindManyOpts

	opts.UserId = request.UserId
	opts.Offset = request.Items * (request.Page - 1)
	opts.Limit = request.Items

	if request.AccountId != nil {
		opts.AccountId = request.AccountId
	}
	if request.CategoryId != nil {
		opts.CategoryId = request.CategoryId
	}
	if request.Month != nil {
		opts.Month = request.Month
	}
	if request.Year != nil {
		opts.Year = request.Year
	}
	if request.Type != nil {
		opts.Type = request.Type
	}

	return opts
}

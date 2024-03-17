package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/common"
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

func (u *TransactionListUsecase) Execute(in transaction.TransactionListIn) (*transaction.TransactionListOut, error) {
	slog.Info("[TransactionListUsecase.Execute] - Get transactions for user:" + in.UserId)
	params := getTransactionSearchParam(in)
	trxs, err := u.repo.FindMany(params)
	if err != nil {
		return nil, err
	}

	// TODO: get total items for given params

	return &transaction.TransactionListOut{
		Data: trxs,
		Metadata: &common.Metadata{
			Page:       in.Page,
			Items:      in.Items,
			TotalPages: 1,
			TotalItems: 1,
		},
	}, nil
}

func getTransactionSearchParam(in transaction.TransactionListIn) transaction.FindManyOpts {
	var opts transaction.FindManyOpts

	opts.UserId = in.UserId
	opts.Offset = in.Items * (in.Page - 1)
	opts.Limit = in.Items

	if in.AccountId != nil {
		opts.AccountId = in.AccountId
	}
	if in.CategoryId != nil {
		opts.CategoryId = in.CategoryId
	}
	if in.Month != nil {
		opts.Month = in.Month
	}
	if in.Year != nil {
		opts.Year = in.Year
	}
	if in.Type != nil {
		opts.Type = in.Type
	}

	return opts
}

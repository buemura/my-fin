package usecase

import (
	"log/slog"
	"math"

	"github.com/buemura/my-fin/internal/domain/account"
)

type AccountListUsecase struct {
	repo account.AccountRepository
}

func NewAccountListUsecase(repo account.AccountRepository) *AccountListUsecase {
	return &AccountListUsecase{
		repo: repo,
	}
}

func (acu *AccountListUsecase) Execute(request account.AccountListIn) (*account.AccountList, error) {
	slog.Info("[AccountListUsecase.Execute] - Get account list for user: " + request.UserId)
	offset, limit := getAccountPaginationParam(request)
	accs, err := acu.repo.FindByUserId(request.UserId, offset, limit)
	if err != nil {
		return nil, err
	}

	totals, err := acu.repo.GetTotalsByUserId(request.UserId)
	if err != nil {
		return nil, err
	}

	return &account.AccountList{
		Data: &account.AccountListOut{
			Accounts:     accs,
			TotalBalance: totals.TotalBalance,
		},
		Metadata: &account.Metadata{
			Page:       request.Page,
			Items:      request.Items,
			TotalPages: int(math.Ceil(float64(totals.TotalItems) / float64(request.Items))),
			TotalItems: totals.TotalItems,
		},
	}, nil
}

func getAccountPaginationParam(request account.AccountListIn) (int, int) {
	offset := request.Items * (request.Page - 1)
	limit := request.Items
	return offset, limit
}

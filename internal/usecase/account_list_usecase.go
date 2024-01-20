package usecase

import (
	"log/slog"

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

func (acu *AccountListUsecase) Execute(request account.AccountListInput) (*account.AccountList, error) {
	slog.Info("[AccountListUsecase.Execute] - Get account list for user: " + request.UserId)
	offset, limit := getPaginationParam(request)
	accs, err := acu.repo.FindByUserId(request.UserId, offset, limit)
	if err != nil {
		return nil, err
	}

	totals, err := acu.repo.GetTotalsByUserId(request.UserId)
	if err != nil {
		return nil, err
	}

	return &account.AccountList{
		Data: &account.AccountListOutput{
			Accounts:    accs,
			TotalAmount: totals.TotalAmount,
		},
		Metadata: &account.Metadata{
			Page:       request.Page,
			Items:      request.Items,
			TotalPages: totals.TotalItems / request.Items, // TODO: Calculate this value
			TotalItems: totals.TotalItems,                 // TODO: return this value from database
		},
	}, nil
}

func getPaginationParam(request account.AccountListInput) (int, int) {
	offset := request.Items * (request.Page - 1)
	limit := request.Items
	return offset, limit
}

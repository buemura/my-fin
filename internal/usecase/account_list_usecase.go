package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/constant"
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

func (acu *AccountListUsecase) Execute(request account.AccountListInput) (*account.AccountListOutput, error) {
	slog.Info("[AccountListUsecase.Execute] - Get account list for user: " + request.UserId)
	offset, limit := getPaginationParam(request)
	accs, err := acu.repo.FindByUserId(request.UserId, offset, limit)
	if err != nil {
		return nil, err
	}

	totalAmount, err := acu.repo.GetTotalAmountByUserId(request.UserId)
	if err != nil {
		return nil, err
	}

	return &account.AccountListOutput{
		Accounts:    accs,
		TotalAmount: totalAmount,
	}, nil
}

func getPaginationParam(request account.AccountListInput) (int, int) {
	if request.Page == nil {
		*request.Page = constant.DEFAULT_ACCOUNT_PAGE
	}
	if request.Items == nil {
		*request.Items = constant.DEFAULT_ACCOUNT_ITEMS
	}
	offset := *request.Items * (*request.Page - 1)
	limit := *request.Items
	return offset, limit
}

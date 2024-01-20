package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/account"
)

type AccountUpdateUsecase struct {
	repo account.AccountRepository
}

func NewAccountUpdateUsecase(repo account.AccountRepository) *AccountUpdateUsecase {
	return &AccountUpdateUsecase{
		repo: repo,
	}
}

func (acu *AccountUpdateUsecase) Execute(accountId string, input account.AccountUpdateInput) (*account.Account, error) {
	slog.Info("[AccountUpdateUsecase.Execute] - Update account: " + accountId)
	acc, err := acu.repo.FindById(accountId)
	if err != nil {
		return nil, err
	}

	if input.Name != nil {
		acc.Name = *input.Name
	}
	if input.Amount != nil {
		acc.Amount = *input.Amount
	}

	res, err := acu.repo.Save(acc)
	if err != nil {
		return nil, err
	}

	return res, nil
}

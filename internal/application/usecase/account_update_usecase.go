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

func (acu *AccountUpdateUsecase) Execute(accountId string, input account.AccountUpdateIn) (*account.Account, error) {
	slog.Info("[AccountUpdateUsecase.Execute] - Update account: " + accountId)
	acc, err := acu.repo.FindById(accountId)
	if err != nil {
		return nil, err
	}

	if input.Name != nil {
		acc.Name = *input.Name
	}
	if input.Balance != nil {
		acc.Balance = *input.Balance
	}
	if input.Color != nil {
		acc.Color = *input.Color
	}

	res, err := acu.repo.Update(acc)
	if err != nil {
		return nil, err
	}

	return res, nil
}

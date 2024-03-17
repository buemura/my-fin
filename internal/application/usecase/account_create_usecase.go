package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/account"
)

type AccountCreateUsecase struct {
	repo account.AccountRepository
}

func NewAccountCreateUsecase(repo account.AccountRepository) *AccountCreateUsecase {
	return &AccountCreateUsecase{
		repo: repo,
	}
}

func (acu *AccountCreateUsecase) Execute(input account.AccountCreateIn) (*account.Account, error) {
	slog.Info("[AccountCreateUsecase.Execute] - Create account: " + input.Name)
	acc, err := account.NewAccount(input)
	if err != nil {
		return nil, err
	}

	res, err := acu.repo.Save(acc)
	if err != nil {
		return nil, err
	}
	return res, nil
}

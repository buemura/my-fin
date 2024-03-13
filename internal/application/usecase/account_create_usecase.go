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

func (acu *AccountCreateUsecase) Execute(input account.AccountCreateInput) (*account.Account, error) {
	slog.Info("[AccountCreateUsecase.Execute] - Create account: " + input.Name)
	acc := account.NewAccount(input)
	res, err := acu.repo.Save(acc)
	if err != nil {
		return nil, err
	}
	return res, nil
}

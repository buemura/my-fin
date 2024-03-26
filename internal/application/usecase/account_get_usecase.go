package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/account"
)

type AccountGetUsecase struct {
	repo account.AccountRepository
}

func NewAccountGetUsecase(repo account.AccountRepository) *AccountGetUsecase {
	return &AccountGetUsecase{
		repo: repo,
	}
}

func (acu *AccountGetUsecase) Execute(accountId string) (*account.Account, error) {
	slog.Info("[AccountGetUsecase.Execute] - Get account: " + accountId)
	acc, err := acu.repo.FindById(accountId)
	if err != nil {
		return nil, err
	}
	return acc, nil
}

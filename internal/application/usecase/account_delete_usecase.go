package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/account"
)

type AccountDeleteUsecase struct {
	repo account.AccountRepository
}

func NewAccountDeleteUsecase(repo account.AccountRepository) *AccountDeleteUsecase {
	return &AccountDeleteUsecase{
		repo: repo,
	}
}

func (acu *AccountDeleteUsecase) Execute(accountId string) error {
	slog.Info("[AccountDeleteUsecase.Execute] - Delete account: " + accountId)
	err := acu.repo.Delete(accountId)
	if err != nil {
		return err
	}
	return nil
}

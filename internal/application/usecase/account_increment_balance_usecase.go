package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/account"
)

type AccountIncrementBalanceUsecase struct {
	repo account.AccountRepository
}

func NewAccountIncrementBalanceUsecase(repo account.AccountRepository) *AccountIncrementBalanceUsecase {
	return &AccountIncrementBalanceUsecase{
		repo: repo,
	}
}

func (acu *AccountIncrementBalanceUsecase) Execute(accountId string, amount int) (*account.Account, error) {
	slog.Info("[AccountIncrementBalanceUsecase.Execute] - Update account: " + accountId)
	acc, err := acu.repo.FindById(accountId)
	if err != nil {
		return nil, err
	}

	acc.Balance += amount

	res, err := acu.repo.Update(acc)
	if err != nil {
		return nil, err
	}

	return res, nil
}

package container

import (
	"github.com/buemura/my-fin/internal/domain/account"
	"github.com/buemura/my-fin/internal/usecase"
)

// Account
func LoadAccountCreateUsecase(accountRepo account.AccountRepository) *usecase.AccountCreateUsecase {
	// accountRepo := repositories.NewGormAccountRepository()
	accountCreateUsecase := usecase.NewAccountCreateUsecase(accountRepo)
	return accountCreateUsecase
}
func LoadAccountDeleteUsecase(accountRepo account.AccountRepository) *usecase.AccountDeleteUsecase {
	// accountRepo := repositories.NewGormAccountRepository()
	accountDeleteUsecase := usecase.NewAccountDeleteUsecase(accountRepo)
	return accountDeleteUsecase
}
func LoadAccountGetUsecase(accountRepo account.AccountRepository) *usecase.AccountGetUsecase {
	// accountRepo := repositories.NewGormAccountRepository()
	accountGetUsecase := usecase.NewAccountGetUsecase(accountRepo)
	return accountGetUsecase
}
func LoadAccountListUsecase(accountRepo account.AccountRepository) *usecase.AccountListUsecase {
	// accountRepo := repositories.NewGormAccountRepository()
	accountListUsecase := usecase.NewAccountListUsecase(accountRepo)
	return accountListUsecase
}
func LoadAccountUpdateUsecase(accountRepo account.AccountRepository) *usecase.AccountUpdateUsecase {
	// accountRepo := repositories.NewGormAccountRepository()
	accountUpdateUsecase := usecase.NewAccountUpdateUsecase(accountRepo)
	return accountUpdateUsecase
}

package container

import (
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/buemura/my-fin/internal/usecase"
)

func LoadUserSigninUsecase() *usecase.UserSigninUsecase {
	userRepo := repositories.NewGormUserRepository()
	userSigninUsecase := usecase.NewUserSigninUsecase(userRepo)
	return userSigninUsecase
}

func LoadUserSignupUsecase() *usecase.UserSignupUsecase {
	userRepo := repositories.NewGormUserRepository()
	userSignupUsecase := usecase.NewUserSignupUsecase(userRepo)
	return userSignupUsecase
}

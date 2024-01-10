package usecase

import (
	"errors"
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/user"
)

type UserSigninUsecase struct {
	repo user.UserRepository
}

func NewUserSigninUsecase(repo user.UserRepository) *UserSigninUsecase {
	return &UserSigninUsecase{
		repo: repo,
	}
}

func (usu *UserSigninUsecase) Execute(input user.UserSigninInput) (*user.User, error) {
	slog.Info("[UserSigninUsecase.Execute] - Sign in user: " + input.Email)
	userExists, err := usu.repo.FindByEmail(input.Email)
	if err != nil {
		return nil, err
	}
	if userExists == nil {
		return nil, errors.New("user not found")
	}

	return userExists, nil
}

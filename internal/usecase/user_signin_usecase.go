package usecase

import (
	"errors"
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/buemura/my-fin/internal/infra/encryption"
)

type UserSigninUsecase struct {
	repo user.UserRepository
}

func NewUserSigninUsecase(repo user.UserRepository) *UserSigninUsecase {
	return &UserSigninUsecase{
		repo: repo,
	}
}

func (usu *UserSigninUsecase) Execute(input user.UserSigninInput) (*user.UserSigninOutput, error) {
	slog.Info("[UserSigninUsecase.Execute] - Sign in user: " + input.Email)
	usr, err := usu.repo.FindByEmail(input.Email)
	if err != nil {
		return nil, err
	}
	if usr == nil {
		return nil, errors.New("user not found")
	}

	validPassword := encryption.ComparePassword(usr.Password, input.Password)
	if !validPassword {
		return nil, errors.New("invalid credential")
	}

	token, err := encryption.GenerateToken(usr.ID)
	if err != nil {
		return nil, err
	}

	return &user.UserSigninOutput{
		AccessToken: token,
		User:        *usr,
	}, nil
}

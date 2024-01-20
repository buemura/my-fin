package usecase

import (
	"errors"
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/buemura/my-fin/internal/infra/encryption"
)

type UserSignupUsecase struct {
	repo user.UserRepository
}

func NewUserSignupUsecase(repo user.UserRepository) *UserSignupUsecase {
	return &UserSignupUsecase{
		repo: repo,
	}
}

func (usu *UserSignupUsecase) Execute(input user.UserSignupInput) (*user.User, error) {
	slog.Info("[UserSignupUsecase.Execute] - Sign up user: " + input.Email)
	userExists, err := usu.repo.FindByEmail(input.Email)
	if err != nil {
		if userExists != nil {
			return nil, errors.New("user already exists")
		}
		return nil, err
	}

	hashedPassword, err := encryption.HashPassword(input.Password)
	if err != nil {
		return nil, err
	}

	input.Password = hashedPassword
	u := user.NewUser(input)
	usu.repo.Save(u)
	return u, nil
}

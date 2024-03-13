package usecase

import (
	"errors"
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/user"
)

type UserGetUsecase struct {
	repo user.UserRepository
}

func NewUserGetUsecase(repo user.UserRepository) *UserGetUsecase {
	return &UserGetUsecase{
		repo: repo,
	}
}

func (usu *UserGetUsecase) Execute(id string) (*user.User, error) {
	slog.Info("[UserGetUsecase.Execute] - Get user: " + id)
	user, err := usu.repo.FindById(id)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}
	return user, nil
}

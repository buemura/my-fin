package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/application/contracts"
	"github.com/buemura/my-fin/internal/domain/user"
)

type UserSignupUsecase struct {
	repo           user.UserRepository
	passwordHasher contracts.PasswordHasher
}

func NewUserSignupUsecase(repo user.UserRepository, passwordHasher contracts.PasswordHasher) *UserSignupUsecase {
	return &UserSignupUsecase{
		repo:           repo,
		passwordHasher: passwordHasher,
	}
}

func (uc *UserSignupUsecase) Execute(input user.SignUpUserIn) (*user.UserOut, error) {
	slog.Info("[UserSignupUsecase.Execute] - Sign up user: " + input.Email)
	userExists, err := uc.repo.FindByEmail(input.Email)
	if err != nil {
		return nil, err
	}
	if userExists != nil {
		return nil, user.ErrUserAlreadyExists
	}

	hashedPassword, err := uc.passwordHasher.Hash(input.Password)
	if err != nil {
		return nil, err
	}

	input.Password = hashedPassword
	u := user.NewUser(input)
	usr, err := uc.repo.Save(u)
	if err != nil {
		return nil, err
	}

	return &user.UserOut{
		ID:        usr.ID,
		Name:      usr.Name,
		Email:     usr.Email,
		CreatedAt: usr.CreatedAt,
	}, nil
}

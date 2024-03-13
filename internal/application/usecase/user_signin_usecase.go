package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/application/contracts"
	"github.com/buemura/my-fin/internal/domain/user"
)

type UserSigninUsecase struct {
	repo           user.UserRepository
	passwordHasher contracts.PasswordHasher
	tokenGenerator contracts.TokenGenerator
}

func NewUserSigninUsecase(repo user.UserRepository, passwordHasher contracts.PasswordHasher, tokenGenerator contracts.TokenGenerator) *UserSigninUsecase {
	return &UserSigninUsecase{
		repo:           repo,
		passwordHasher: passwordHasher,
		tokenGenerator: tokenGenerator,
	}
}

func (uc *UserSigninUsecase) Execute(input user.SignInUserIn) (*user.SignInUserOut, error) {
	slog.Info("[UserSigninUsecase.Execute] - Sign in user: " + input.Email)
	usr, err := uc.repo.FindByEmail(input.Email)
	if err != nil {
		return nil, err
	}
	if usr == nil {
		return nil, user.ErrUserNotFound
	}

	validPassword := uc.passwordHasher.Compare(input.Password, usr.Password)
	if !validPassword {
		return nil, user.ErrUserInvalidCredential
	}

	token, err := uc.tokenGenerator.Generate(usr.ID)
	if err != nil {
		return nil, err
	}

	return &user.SignInUserOut{
		AccessToken: token,
		User: user.UserOut{
			ID:        usr.ID,
			Name:      usr.Name,
			Email:     usr.Email,
			CreatedAt: usr.CreatedAt,
		},
	}, nil
}

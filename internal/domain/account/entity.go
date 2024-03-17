package account

import (
	"time"

	"github.com/buemura/my-fin/internal/domain/common"
	"github.com/google/uuid"
)

type Account struct {
	ID        string    `json:"id"`
	UserId    string    `json:"userId"`
	Name      string    `json:"name"`
	Balance   int       `json:"balance"`
	Color     string    `json:"color"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func NewAccount(in AccountCreateIn) (*Account, error) {
	err := validate(in)
	if err != nil {
		return nil, err
	}

	return &Account{
		ID:        uuid.NewString(),
		UserId:    in.UserId,
		Name:      in.Name,
		Balance:   in.Balance,
		Color:     in.Color,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}, nil
}

func validate(in AccountCreateIn) error {
	if in.UserId == "" || in.Name == "" || in.Color == "" {
		return common.ErrMissingArgument
	}
	return nil
}

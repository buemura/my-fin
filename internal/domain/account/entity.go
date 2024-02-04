package account

import (
	"time"

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

func NewAccount(input AccountCreateInput) *Account {
	return &Account{
		ID:        uuid.NewString(),
		UserId:    input.UserId,
		Name:      input.Name,
		Balance:   input.Balance,
		Color:     input.Color,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

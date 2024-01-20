package account

import (
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID        string    `json:"id"`
	UserId    string    `json:"userId"`
	Name      string    `json:"name"`
	Amount    int       `json:"amount"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func NewAccount(input AccountCreateInput) *Account {
	return &Account{
		ID:        uuid.NewString(),
		UserId:    input.UserId,
		Name:      input.Name,
		Amount:    input.Amount,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

package transaction

import (
	"time"

	"github.com/google/uuid"
)

type Transaction struct {
	ID         string    `json:"id"`
	UserId     string    `json:"userId"`
	AccountId  string    `json:"accountId"`
	CategoryId string    `json:"categoryId"`
	Name       string    `json:"name"`
	Amount     int       `json:"amount"`
	Type       string    `json:"type"`
	Date       time.Time `json:"date"`
}

func NewTransaction(input TransactionCreateInput) *Transaction {
	return &Transaction{
		ID:         uuid.NewString(),
		UserId:     input.UserId,
		AccountId:  input.AccountId,
		CategoryId: input.CategoryId,
		Name:       input.Name,
		Amount:     input.Amount,
		Type:       input.Type,
		Date:       input.Date,
	}
}

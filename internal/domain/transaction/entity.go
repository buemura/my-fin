package transaction

import (
	"time"

	"github.com/buemura/my-fin/internal/domain/common"
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

func NewTransaction(in TransactionCreateIn) (*Transaction, error) {
	err := validate(in)
	if err != nil {
		return nil, err
	}

	return &Transaction{
		ID:         uuid.NewString(),
		UserId:     in.UserId,
		AccountId:  in.AccountId,
		CategoryId: in.CategoryId,
		Name:       in.Name,
		Amount:     in.Amount,
		Type:       in.Type,
		Date:       in.Date,
	}, nil
}

func validate(in TransactionCreateIn) error {
	if in.UserId == "" ||
		in.AccountId == "" ||
		in.CategoryId == "" ||
		in.Name == "" ||
		in.Amount <= 0 ||
		in.Type == "" {
		return common.ErrMissingArgument
	}
	return nil
}

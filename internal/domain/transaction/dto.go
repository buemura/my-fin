package transaction

import (
	"time"

	"github.com/buemura/my-fin/internal/domain/common"
)

type TransactionCreateIn struct {
	UserId     string    `json:"userId"`
	AccountId  string    `json:"accountId"`
	CategoryId string    `json:"categoryId"`
	Name       string    `json:"name"`
	Amount     int       `json:"amount"`
	Type       string    `json:"type"`
	Date       time.Time `json:"date"`
}

type TransactionUpdateIn struct {
	AccountId  *string    `json:"accountId"`
	CategoryId *string    `json:"categoryId"`
	Name       *string    `json:"name"`
	Amount     *int       `json:"amount"`
	Type       *string    `json:"type"`
	Date       *time.Time `json:"date"`
}

type TransactionListIn struct {
	UserId     string  `json:"userId"`
	Page       int     `json:"page"`
	Items      int     `json:"items"`
	AccountId  *string `json:"accountId"`
	CategoryId *string `json:"categoryId"`
	Type       *string `json:"type"`
	Month      *int    `json:"month"`
	Year       *int    `json:"year"`
}

type TransactionListOut struct {
	Data     []*Transaction   `json:"data"`
	Metadata *common.Metadata `json:"metadata"`
}

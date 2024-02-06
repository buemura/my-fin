package transaction

import "time"

type TransactionCreateInput struct {
	UserId     string    `json:"userId"`
	AccountId  string    `json:"accountId"`
	CategoryId string    `json:"categoryId"`
	Name       string    `json:"name"`
	Amount     int       `json:"amount"`
	Type       string    `json:"type"`
	Date       time.Time `json:"date"`
}

type TransactionUpdateInput struct {
	AccountId  *string    `json:"accountId"`
	CategoryId *string    `json:"categoryId"`
	Name       *string    `json:"name"`
	Amount     *int       `json:"amount"`
	Type       *string    `json:"type"`
	Date       *time.Time `json:"date"`
}

type TransactionListInput struct {
	UserId     string  `json:"userId"`
	Page       int     `json:"page"`
	Items      int     `json:"items"`
	AccountId  *string `json:"accountId"`
	CategoryId *string `json:"categoryId"`
	Type       *string `json:"type"`
	Month      *int    `json:"month"`
	Year       *int    `json:"year"`
}

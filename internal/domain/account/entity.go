package account

import "time"

type Account struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Amount    int       `json:"amount"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type AccountCreate struct {
	Name   string `json:"name"`
	Amount int    `json:"amount"`
}

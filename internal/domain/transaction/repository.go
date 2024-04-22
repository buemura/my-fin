package transaction

type FindManyOpts struct {
	UserId     string  `json:"userId"`
	AccountId  *string `json:"accountId"`
	CategoryId *string `json:"categoryId"`
	Type       *string `json:"type"`
	Month      *int    `json:"month"`
	Year       *int    `json:"year"`
	Limit      int     `json:"limit"`
	Offset     int     `json:"offset"`
}

type TransactionRepository interface {
	FindMany(opts FindManyOpts) ([]*Transaction, error)
	FindById(transactionId string) (*Transaction, error)
	Save(transaction *Transaction) (*Transaction, error)
	Update(transaction *Transaction) (*Transaction, error)
	Delete(transactionId string) error
}

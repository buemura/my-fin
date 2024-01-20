package account

type AccountTotals struct {
	TotalAmount int `json:"totalAmount"`
	TotalItems  int `json:"totalItems"`
}

type AccountRepository interface {
	FindById(accountId string) (*Account, error)
	FindByUserId(userId string, skip, offset int) ([]*Account, error)
	GetTotalsByUserId(userId string) (*AccountTotals, error)
	Save(account *Account) (*Account, error)
	Delete(accountId string) error
}

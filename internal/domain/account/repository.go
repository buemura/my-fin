package account

type AccountRepository interface {
	FindById(accountId string) (*Account, error)
	FindByUserId(userId string, skip, offset int) ([]*Account, error)
	GetTotalAmountByUserId(userId string) (int, error)
	Save(account *Account) (*Account, error)
	Delete(accountId string) error
}

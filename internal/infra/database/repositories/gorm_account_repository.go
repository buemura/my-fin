package repositories

import (
	"github.com/buemura/my-fin/internal/domain/account"
	"github.com/buemura/my-fin/internal/infra/database"
	"gorm.io/gorm"
)

type gormAccountRepository struct {
	db *gorm.DB
}

func NewGormAccountRepository() *gormAccountRepository {
	return &gormAccountRepository{
		db: database.DB,
	}
}

func (r *gormAccountRepository) FindById(id string) (*account.Account, error) {
	var acc *account.Account
	result := r.db.First(&acc, "id = ?", id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return acc, nil
}

func (r *gormAccountRepository) FindByUserId(userId string, offset, limit int) ([]*account.Account, error) {
	var accs []*account.Account
	result := r.db.Limit(limit).Offset(offset).Find(&accs, "user_id = ?", userId)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return accs, nil
}

func (r *gormAccountRepository) GetTotalsByUserId(userId string) (*account.AccountTotals, error) {
	var totals account.AccountTotals
	r.db.Raw("SELECT SUM(amount) as total_amount, COUNT(id) AS total_items FROM account WHERE user_id = ?", userId).Scan(&totals)
	return &totals, nil
}

func (r *gormAccountRepository) Save(acc *account.Account) (*account.Account, error) {
	result := r.db.Save(acc)
	if result.Error != nil {
		return nil, result.Error
	}
	return acc, nil
}

func (r *gormAccountRepository) Delete(accountId string) error {
	result := r.db.Where("id = ?", accountId).Delete(&account.Account{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

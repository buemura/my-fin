package repositories

import (
	"github.com/buemura/my-fin/internal/domain/transaction"
	"github.com/buemura/my-fin/internal/infra/database"
	"gorm.io/gorm"
)

type gormTransactionRepository struct {
	db *gorm.DB
}

func NewGormTransactionRepository() *gormTransactionRepository {
	return &gormTransactionRepository{
		db: database.DB,
	}
}

// TODO: Implement this properly
func (r *gormTransactionRepository) FindMany(opts transaction.FindManyOpts) ([]*transaction.Transaction, error) {
	var trxs []*transaction.Transaction
	result := r.db.Find(&trxs)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return trxs, nil
}

func (r *gormTransactionRepository) FindById(id string) (*transaction.Transaction, error) {
	var trx *transaction.Transaction
	result := r.db.First(&trx, "id = ?", id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return trx, nil
}

func (r *gormTransactionRepository) Save(trx *transaction.Transaction) (*transaction.Transaction, error) {
	result := r.db.Save(trx)
	if result.Error != nil {
		return nil, result.Error
	}
	return trx, nil
}

func (r *gormTransactionRepository) Delete(transactionId string) error {
	result := r.db.Where("id = ?", transactionId).Delete(&transaction.Transaction{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

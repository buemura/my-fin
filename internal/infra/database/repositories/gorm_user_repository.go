package repositories

import (
	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/buemura/my-fin/internal/infra/database"
	"gorm.io/gorm"
)

type gormUserRepository struct {
	db *gorm.DB
}

func NewGormUserRepository() *gormUserRepository {
	return &gormUserRepository{
		db: database.DB,
	}
}

func (r *gormUserRepository) FindById(id string) (*user.User, error) {
	var usr user.User
	result := r.db.First(&usr, "id = ?", id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &usr, nil
}

func (r *gormUserRepository) FindByEmail(email string) (*user.User, error) {
	var usr user.User
	result := r.db.First(&usr, "email = ?", email)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return &usr, nil
}

func (r *gormUserRepository) Save(usr *user.User) (*user.User, error) {
	result := r.db.Save(usr)
	if result.Error != nil {
		return nil, result.Error
	}
	return usr, nil
}

func (r *gormUserRepository) Delete(userID string) error {
	result := r.db.Where("id = ?", userID).Delete(&user.User{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

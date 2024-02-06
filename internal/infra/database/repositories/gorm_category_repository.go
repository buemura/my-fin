package repositories

import (
	"github.com/buemura/my-fin/internal/domain/category"
	"github.com/buemura/my-fin/internal/infra/database"
	"gorm.io/gorm"
)

type gormCategoryRepository struct {
	db *gorm.DB
}

func NewGormCategoryRepository() *gormCategoryRepository {
	return &gormCategoryRepository{
		db: database.DB,
	}
}

func (r *gormCategoryRepository) FindById(id string) (*category.Category, error) {
	var cat *category.Category
	result := r.db.First(&cat, "id = ?", id)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return cat, nil
}

func (r *gormCategoryRepository) FindMany() ([]*category.Category, error) {
	var cats []*category.Category
	result := r.db.Find(&cats)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, result.Error
	}
	return cats, nil
}

func (r *gormCategoryRepository) Save(cat *category.Category) (*category.Category, error) {
	result := r.db.Save(cat)
	if result.Error != nil {
		return nil, result.Error
	}
	return cat, nil
}

func (r *gormCategoryRepository) Delete(categoryId string) error {
	result := r.db.Where("id = ?", categoryId).Delete(&category.Category{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

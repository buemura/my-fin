package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/category"
)

type CategoryUpdateUsecase struct {
	repo category.CategoryRepository
}

func NewCategoryUpdateUsecase(repo category.CategoryRepository) *CategoryUpdateUsecase {
	return &CategoryUpdateUsecase{
		repo: repo,
	}
}

func (u *CategoryUpdateUsecase) Execute(categoryId string, input category.CategoryUpdateInput) (*category.Category, error) {
	slog.Info("[CategoryUpdateUsecase.Execute] - Update category: " + categoryId)
	cat, err := u.repo.FindById(categoryId)
	if err != nil {
		return nil, err
	}

	if input.Name != nil {
		cat.Name = *input.Name
	}
	if input.Type != nil {
		cat.Type = *input.Type
	}

	res, err := u.repo.Save(cat)
	if err != nil {
		return nil, err
	}

	return res, nil
}

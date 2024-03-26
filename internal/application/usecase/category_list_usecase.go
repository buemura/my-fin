package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/category"
)

type CategoryListUsecase struct {
	repo category.CategoryRepository
}

func NewCategoryListUsecase(repo category.CategoryRepository) *CategoryListUsecase {
	return &CategoryListUsecase{
		repo: repo,
	}
}

func (u *CategoryListUsecase) Execute() ([]*category.Category, error) {
	slog.Info("[CategoryListUsecase.Execute] - Get category list")
	cats, err := u.repo.FindMany()
	if err != nil {
		return nil, err
	}
	return cats, nil
}

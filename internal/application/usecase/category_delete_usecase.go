package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/category"
)

type CategoryDeleteUsecase struct {
	repo category.CategoryRepository
}

func NewCategoryDeleteUsecase(repo category.CategoryRepository) *CategoryDeleteUsecase {
	return &CategoryDeleteUsecase{
		repo: repo,
	}
}

func (u *CategoryDeleteUsecase) Execute(categoryId string) error {
	slog.Info("[CategoryDeleteUsecase.Execute] - Delete category: " + categoryId)
	err := u.repo.Delete(categoryId)
	if err != nil {
		return err
	}
	return nil
}

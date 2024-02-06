package usecase

import (
	"log/slog"

	"github.com/buemura/my-fin/internal/domain/category"
)

type CategoryCreateUsecase struct {
	repo category.CategoryRepository
}

func NewCategoryCreateUsecase(repo category.CategoryRepository) *CategoryCreateUsecase {
	return &CategoryCreateUsecase{
		repo: repo,
	}
}

func (u *CategoryCreateUsecase) Execute(input category.CategoryCreateInput) (*category.Category, error) {
	slog.Info("[CategoryCreateUsecase.Execute] - Create category: " + input.Name)
	cat := category.NewCategory(input)
	res, err := u.repo.Save(cat)
	if err != nil {
		return nil, err
	}
	return res, nil
}

package category

import (
	"github.com/buemura/my-fin/internal/domain/common"
	"github.com/google/uuid"
)

type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

func NewCategory(in CategoryCreateIn) (*Category, error) {
	err := validate(in)
	if err != nil {
		return nil, err
	}

	return &Category{
		ID:   uuid.NewString(),
		Name: in.Name,
		Type: in.Type,
	}, nil
}

func validate(in CategoryCreateIn) error {
	if in.Name == "" ||
		in.Type == "" {
		return common.ErrMissingArgument
	}
	return nil
}

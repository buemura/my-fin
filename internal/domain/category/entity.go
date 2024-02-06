package category

import (
	"github.com/google/uuid"
)

type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

func NewCategory(input CategoryCreateInput) *Category {
	return &Category{
		ID:   uuid.NewString(),
		Name: input.Name,
		Type: input.Type,
	}
}

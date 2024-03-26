package user

import (
	"time"

	"github.com/buemura/my-fin/internal/domain/common"
	"github.com/google/uuid"
)

type User struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"createdAt"`
}

func NewUser(in SignUpUserIn) (*User, error) {
	err := validate(in)
	if err != nil {
		return nil, err
	}

	return &User{
		ID:        uuid.NewString(),
		Name:      in.Name,
		Email:     in.Email,
		Password:  in.Password,
		CreatedAt: time.Now(),
	}, nil
}

func validate(in SignUpUserIn) error {
	if in.Name == "" || in.Email == "" || in.Password == "" {
		return common.ErrMissingArgument
	}
	return nil
}

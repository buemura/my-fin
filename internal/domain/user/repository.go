package user

type UserRepository interface {
	FindById(id string) (*User, error)
	FindByEmail(email string) (*User, error)
	Save(user *User) (*User, error)
	Delete(userId string) error
}

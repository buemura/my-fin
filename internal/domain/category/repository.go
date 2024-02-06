package category

type CategoryRepository interface {
	FindById(categoryId string) (*Category, error)
	FindMany() ([]*Category, error)
	Save(category *Category) (*Category, error)
	Delete(categoryId string) error
}

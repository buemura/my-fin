package category

type CategoryCreateInput struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type CategoryUpdateInput struct {
	Name *string `json:"name"`
	Type *string `json:"type"`
}

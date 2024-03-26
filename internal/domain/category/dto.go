package category

type CategoryCreateIn struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

type CategoryUpdateIn struct {
	Name *string `json:"name"`
	Type *string `json:"type"`
}

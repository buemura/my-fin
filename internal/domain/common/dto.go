package common

type Metadata struct {
	Page       int `json:"page"`
	Items      int `json:"items"`
	TotalPages int `json:"totalPages"`
	TotalItems int `json:"totalItems"`
}

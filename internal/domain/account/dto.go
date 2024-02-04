package account

type AccountCreateInput struct {
	UserId  string `json:"userId"`
	Name    string `json:"name"`
	Balance int    `json:"balance"`
	Color   string `json:"color"`
}

type AccountUpdateInput struct {
	Name    *string `json:"name"`
	Balance *int    `json:"balance"`
	Color   *string `json:"color"`
}

type AccountListInput struct {
	UserId string `json:"userId"`
	Page   int    `json:"page"`
	Items  int    `json:"items"`
}

type AccountListOutput struct {
	Accounts     []*Account `json:"accounts"`
	TotalBalance int        `json:"totalBalance"`
}

type Metadata struct {
	Page       int `json:"page"`
	Items      int `json:"items"`
	TotalPages int `json:"totalPages"`
	TotalItems int `json:"totalItems"`
}

type AccountList struct {
	Data     *AccountListOutput `json:"data"`
	Metadata *Metadata          `json:"metadata"`
}

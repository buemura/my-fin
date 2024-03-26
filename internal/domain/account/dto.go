package account

import "github.com/buemura/my-fin/internal/domain/common"

type AccountCreateIn struct {
	UserId  string `json:"userId"`
	Name    string `json:"name"`
	Balance int    `json:"balance"`
	Color   string `json:"color"`
}

type AccountUpdateIn struct {
	Name    *string `json:"name"`
	Balance *int    `json:"balance"`
	Color   *string `json:"color"`
}

type AccountListIn struct {
	UserId string `json:"userId"`
	Page   int    `json:"page"`
	Items  int    `json:"items"`
}

type AccountListOut struct {
	Accounts     []*Account `json:"accounts"`
	TotalBalance int        `json:"totalBalance"`
}

type AccountList struct {
	Data     *AccountListOut  `json:"data"`
	Metadata *common.Metadata `json:"metadata"`
}

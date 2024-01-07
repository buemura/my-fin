package routes

import (
	"net/http"
	"time"

	"github.com/buemura/my-fin/internal/domain/account"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type AccountListData struct {
	Accounts    []account.Account `json:"accounts"`
	TotalAmount int               `json:"totalAmount"`
}

type Metadata struct {
	Page       int `json:"page"`
	Items      int `json:"items"`
	TotalPages int `json:"totalPages"`
	TotalItems int `json:"totalItems"`
}

type AccountList struct {
	Data     AccountListData `json:"data"`
	Metadata Metadata        `json:"metadata"`
}

func SetupRoutes(e *echo.Echo) {
	accounts := []account.Account{
		{ID: "7056166d-a2e0-48b5-bd5c-e37385a9b682", Name: "Nubank", Amount: 12000000, UpdatedAt: time.Now()},
		{ID: "a8f1cd1f-5456-4667-bdbd-787344082a30", Name: "Itau", Amount: 7000000, UpdatedAt: time.Now()},
		{ID: "457e9c0d-cadc-41fb-887d-c2d74f7ca8b4", Name: "Inter", Amount: 3000000, UpdatedAt: time.Now()},
	}

	accountList := AccountList{
		Data: AccountListData{
			Accounts: accounts,
		},
		Metadata: Metadata{
			Page:       1,
			Items:      3,
			TotalPages: 1,
			TotalItems: len(accounts),
		},
	}

	e.GET("/api/accounts", func(c echo.Context) error {
		return c.JSON(200, accountList)
	})

	e.GET("/api/accounts/:id", func(c echo.Context) error {
		id := c.Param("id")
		accIndex := 0

		for i, v := range accounts {
			if v.ID == id {
				accIndex = i
				break
			}
		}

		return c.JSON(200, accounts[accIndex])
	})

	e.POST("/api/accounts", func(c echo.Context) error {
		a := new(account.Account)
		if err := c.Bind(a); err != nil {
			return c.String(http.StatusBadRequest, "bad request")
		}

		accounts = append(accounts, account.Account{
			ID:        uuid.NewString(),
			Name:      a.Name,
			Amount:    a.Amount,
			UpdatedAt: time.Now(),
		})

		return c.JSON(200, accountList)
	})

	e.DELETE("/api/accounts/:id", func(c echo.Context) error {
		id := c.Param("id")
		accIndex := 0
		for i, v := range accounts {
			if v.ID == id {
				accIndex = i
				break
			}
		}
		removeIndex(accounts, accIndex)
		return c.JSON(200, accountList)
	})
}

func removeIndex(arr []account.Account, index int) []account.Account {
	return append(arr[:index], arr[index+1:]...)
}

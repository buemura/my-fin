package controllers

import (
	"log/slog"
	"net/http"
	"strconv"

	"github.com/buemura/my-fin/internal/api/helpers"
	"github.com/buemura/my-fin/internal/constant"
	"github.com/buemura/my-fin/internal/domain/account"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/buemura/my-fin/pkg/utils"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type AccountController struct {
	AccountCreateUsecase usecase.AccountCreateUsecase
	AccountDeleteUsecase usecase.AccountDeleteUsecase
	AccountGetUsecase    usecase.AccountGetUsecase
	AccountListUsecase   usecase.AccountListUsecase
	AccountUpdateUsecase usecase.AccountUpdateUsecase
}

func NewAccountController(
	AccountCreateUsecase usecase.AccountCreateUsecase,
	AccountDeleteUsecase usecase.AccountDeleteUsecase,
	AccountGetUsecase usecase.AccountGetUsecase,
	AccountListUsecase usecase.AccountListUsecase,
	AccountUpdateUsecase usecase.AccountUpdateUsecase,
) *AccountController {
	return &AccountController{
		AccountCreateUsecase: AccountCreateUsecase,
		AccountDeleteUsecase: AccountDeleteUsecase,
		AccountGetUsecase:    AccountGetUsecase,
		AccountListUsecase:   AccountListUsecase,
		AccountUpdateUsecase: AccountUpdateUsecase,
	}
}

func (h *AccountController) Create(c echo.Context) error {
	slog.Info("[AccountController.Create] - Validating parameters")
	body := new(account.AccountCreateInput)
	if err := c.Bind(&body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	slog.Info("[AccountController.Create] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	userId := c.Param("userId")
	input := account.AccountCreateInput{
		UserId:  userId,
		Name:    body.Name,
		Balance: body.Balance,
		Color:   body.Color,
	}

	res, err := h.AccountCreateUsecase.Execute(input)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	return c.JSON(http.StatusCreated, res)
}

func (h *AccountController) Delete(c echo.Context) error {
	slog.Info("[AccountController.Get] - Validating parameters")
	accountId := c.Param("accountId")
	err := h.AccountDeleteUsecase.Execute(accountId)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *AccountController) List(c echo.Context) error {
	slog.Info("[AccountController.List] - Validating parameters")
	userId := c.Param("userId")
	page, items := getPaginationParams(c)

	res, err := h.AccountListUsecase.Execute(account.AccountListInput{
		UserId: userId,
		Page:   page,
		Items:  items,
	})
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}
	return c.JSON(http.StatusOK, res)
}

func (h *AccountController) Get(c echo.Context) error {
	slog.Info("[AccountController.Get] - Validating parameters")
	accountId := c.Param("accountId")
	res, err := h.AccountGetUsecase.Execute(accountId)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}
	return c.JSON(http.StatusOK, res)
}

func (h *AccountController) Update(c echo.Context) error {
	slog.Info("[AccountController.Update] - Validating parameters")
	accountId := c.Param("accountId")

	body := new(account.AccountUpdateInput)
	if err := c.Bind(&body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	slog.Info("[AccountController.Create] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	input := account.AccountUpdateInput{
		Name:    body.Name,
		Balance: body.Balance,
		Color:   body.Color,
	}
	res, err := h.AccountUpdateUsecase.Execute(accountId, input)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}
	return c.JSON(http.StatusOK, res)
}

func getPaginationParams(c echo.Context) (int, int) {
	var page, items int
	var err error

	pageStr := c.QueryParam("page")
	page, err = strconv.Atoi(pageStr)
	if err != nil {
		page = constant.DEFAULT_ACCOUNT_PAGE
	}
	itemsStr := c.QueryParam("items")
	items, err = strconv.Atoi(itemsStr)
	if err != nil {
		items = constant.DEFAULT_ACCOUNT_ITEMS
	}

	return page, items
}

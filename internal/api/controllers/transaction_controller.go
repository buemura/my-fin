package controllers

import (
	"log/slog"
	"net/http"
	"strconv"

	"github.com/buemura/my-fin/internal/api/helpers"
	"github.com/buemura/my-fin/internal/constant"
	"github.com/buemura/my-fin/internal/domain/transaction"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/buemura/my-fin/pkg/utils"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type TransactionController struct {
	TransactionCreateUsecase usecase.TransactionCreateUsecase
	TransactionDeleteUsecase usecase.TransactionDeleteUsecase
	TransactionListUsecase   usecase.TransactionListUsecase
	TransactionUpdateUsecase usecase.TransactionUpdateUsecase
}

func NewTransactionController(
	TransactionCreateUsecase usecase.TransactionCreateUsecase,
	TransactionDeleteUsecase usecase.TransactionDeleteUsecase,
	TransactionListUsecase usecase.TransactionListUsecase,
	TransactionUpdateUsecase usecase.TransactionUpdateUsecase,
) *TransactionController {
	return &TransactionController{
		TransactionCreateUsecase: TransactionCreateUsecase,
		TransactionDeleteUsecase: TransactionDeleteUsecase,
		TransactionListUsecase:   TransactionListUsecase,
		TransactionUpdateUsecase: TransactionUpdateUsecase,
	}
}

func (h *TransactionController) Create(c echo.Context) error {
	slog.Info("[TransactionController.Create] - Validating parameters")
	body := new(transaction.TransactionCreateInput)
	if err := c.Bind(&body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	slog.Info("[TransactionController.Create] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	userId := c.Param("userId")
	input := transaction.TransactionCreateInput{
		UserId:     userId,
		AccountId:  body.AccountId,
		CategoryId: body.CategoryId,
		Name:       body.Name,
		Amount:     body.Amount,
		Type:       body.Type,
		Date:       body.Date,
	}

	res, err := h.TransactionCreateUsecase.Execute(input)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}

	return c.JSON(http.StatusCreated, res)
}

func (h *TransactionController) Delete(c echo.Context) error {
	slog.Info("[TransactionController.Get] - Validating parameters")
	transactionId := c.Param("transactionId")
	err := h.TransactionDeleteUsecase.Execute(transactionId)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *TransactionController) List(c echo.Context) error {
	slog.Info("[TransactionController.List] - Validating parameters")
	params := getTransactionSearchParams(c)
	res, err := h.TransactionListUsecase.Execute(params)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}
	return c.JSON(http.StatusOK, res)
}

func (h *TransactionController) Update(c echo.Context) error {
	slog.Info("[TransactionController.Update] - Validating parameters")
	transactionId := c.Param("transactionId")

	body := new(transaction.TransactionUpdateInput)
	if err := c.Bind(&body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	slog.Info("[TransactionController.Create] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	input := transaction.TransactionUpdateInput{
		AccountId:  body.AccountId,
		CategoryId: body.CategoryId,
		Name:       body.Name,
		Amount:     body.Amount,
		Type:       body.Type,
		Date:       body.Date,
	}
	res, err := h.TransactionUpdateUsecase.Execute(transactionId, input)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}
	return c.JSON(http.StatusOK, res)
}

func getTransactionSearchParams(c echo.Context) transaction.TransactionListInput {
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
	return transaction.TransactionListInput{
		UserId: c.Param("userId"),
		Page:   page,
		Items:  items,
	}
}

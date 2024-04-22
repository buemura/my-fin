package controllers

import (
	"log/slog"
	"net/http"
	"strconv"

	"github.com/buemura/my-fin/internal/api/helpers"
	"github.com/buemura/my-fin/internal/api/middleware"
	"github.com/buemura/my-fin/internal/application/usecase"
	"github.com/buemura/my-fin/internal/constant"
	"github.com/buemura/my-fin/internal/domain/transaction"
	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/buemura/my-fin/pkg/utils"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type TransactionController struct {
	TransactionCreateUsecase       usecase.TransactionCreateUsecase
	TransactionDeleteUsecase       usecase.TransactionDeleteUsecase
	TransactionListUsecase         usecase.TransactionListUsecase
	TransactionGetUsecase          usecase.TransactionGetUsecase
	TransactionUpdateUsecase       usecase.TransactionUpdateUsecase
	AccountIncrementBalanceUsecase usecase.AccountIncrementBalanceUsecase
}

func NewTransactionController(
	TransactionCreateUsecase usecase.TransactionCreateUsecase,
	TransactionDeleteUsecase usecase.TransactionDeleteUsecase,
	TransactionListUsecase usecase.TransactionListUsecase,
	TransactionGetUsecase usecase.TransactionGetUsecase,
	TransactionUpdateUsecase usecase.TransactionUpdateUsecase,
	AccountIncrementBalanceUsecase usecase.AccountIncrementBalanceUsecase,
) *TransactionController {
	return &TransactionController{
		TransactionCreateUsecase:       TransactionCreateUsecase,
		TransactionDeleteUsecase:       TransactionDeleteUsecase,
		TransactionListUsecase:         TransactionListUsecase,
		TransactionGetUsecase:          TransactionGetUsecase,
		TransactionUpdateUsecase:       TransactionUpdateUsecase,
		AccountIncrementBalanceUsecase: AccountIncrementBalanceUsecase,
	}
}

func (h *TransactionController) Create(c echo.Context) error {
	slog.Info("[TransactionController.Create] - Validating parameters")
	body := new(transaction.TransactionCreateIn)
	if err := c.Bind(&body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	slog.Info("[TransactionController.Create] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	usr, ok := c.Get(constant.UserContextKey).(middleware.RquestUser)
	if !ok {
		return helpers.HandleHttpError(c, user.ErrPermissionDenied)
	}

	input := transaction.TransactionCreateIn{
		UserId:     usr.ID,
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

	_, err = h.AccountIncrementBalanceUsecase.Execute(input.AccountId, input.Amount)
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

func (h *TransactionController) Get(c echo.Context) error {
	slog.Info("[TransactionController.Get] - Validating parameters")
	transactionId := c.Param("transactionId")
	res, err := h.TransactionGetUsecase.Execute(transactionId)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}
	return c.JSON(http.StatusOK, res)
}

func (h *TransactionController) Update(c echo.Context) error {
	slog.Info("[TransactionController.Update] - Validating parameters")
	transactionId := c.Param("transactionId")

	body := new(transaction.TransactionUpdateIn)
	if err := c.Bind(&body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	slog.Info("[TransactionController.Create] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	input := transaction.TransactionUpdateIn{
		AccountId:  body.AccountId,
		CategoryId: body.CategoryId,
		Name:       body.Name,
		Amount:     body.Amount,
		Type:       body.Type,
		Date:       body.Date,
	}

	// Get transaction
	trx, err := h.TransactionGetUsecase.Execute(transactionId)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}

	amountToUpdate := 0
	if *input.Type == "EXPENSE" {
		amountToUpdate += (trx.Amount)
	}

	trxToUpdate := getUpdateParams(trx, input)

	// Update transaction
	res, err := h.TransactionUpdateUsecase.Execute(trxToUpdate)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}

	_, err = h.AccountIncrementBalanceUsecase.Execute(res.AccountId, amountToUpdate)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}

	return c.JSON(http.StatusOK, res)
}

func getTransactionSearchParams(c echo.Context) transaction.TransactionListIn {
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

	u := c.Get(constant.UserContextKey).(middleware.RquestUser)

	return transaction.TransactionListIn{
		UserId: u.ID,
		Page:   page,
		Items:  items,
	}
}

func getUpdateParams(trx *transaction.Transaction, input transaction.TransactionUpdateIn) *transaction.Transaction {
	if input.AccountId != nil {
		trx.AccountId = *input.AccountId
	}
	if input.CategoryId != nil {
		trx.CategoryId = *input.CategoryId
	}
	if input.Name != nil {
		trx.Name = *input.Name
	}
	if input.Amount != nil {
		trx.Amount = *input.Amount
	}
	if input.Type != nil {
		trx.Type = *input.Type
	}
	if input.Date != nil {
		trx.Date = *input.Date
	}

	return trx
}

package controllers

import (
	"log/slog"
	"net/http"

	"github.com/buemura/my-fin/internal/api/helpers"
	"github.com/buemura/my-fin/internal/domain/category"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/buemura/my-fin/pkg/utils"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type CategoryController struct {
	CategoryCreateUsecase usecase.CategoryCreateUsecase
	CategoryDeleteUsecase usecase.CategoryDeleteUsecase
	CategoryListUsecase   usecase.CategoryListUsecase
	CategoryUpdateUsecase usecase.CategoryUpdateUsecase
}

func NewCategoryController(
	CategoryCreateUsecase usecase.CategoryCreateUsecase,
	CategoryDeleteUsecase usecase.CategoryDeleteUsecase,
	CategoryListUsecase usecase.CategoryListUsecase,
	CategoryUpdateUsecase usecase.CategoryUpdateUsecase,
) *CategoryController {
	return &CategoryController{
		CategoryCreateUsecase: CategoryCreateUsecase,
		CategoryDeleteUsecase: CategoryDeleteUsecase,
		CategoryListUsecase:   CategoryListUsecase,
		CategoryUpdateUsecase: CategoryUpdateUsecase,
	}
}

func (h *CategoryController) Create(c echo.Context) error {
	slog.Info("[CategoryController.Create] - Validating parameters")
	body := new(category.CategoryCreateInput)
	if err := c.Bind(&body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	slog.Info("[CategoryController.Create] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	input := category.CategoryCreateInput{
		Name: body.Name,
		Type: body.Type,
	}

	res, err := h.CategoryCreateUsecase.Execute(input)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}

	return c.JSON(http.StatusCreated, res)
}

func (h *CategoryController) Delete(c echo.Context) error {
	slog.Info("[CategoryController.Delete] - Validating parameters")
	categoryId := c.Param("categoryId")
	err := h.CategoryDeleteUsecase.Execute(categoryId)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *CategoryController) List(c echo.Context) error {
	slog.Info("[CategoryController.List] - Validating parameters")
	res, err := h.CategoryListUsecase.Execute()
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}
	return c.JSON(http.StatusOK, res)
}

func (h *CategoryController) Update(c echo.Context) error {
	slog.Info("[CategoryController.Update] - Validating parameters")
	categoryId := c.Param("categoryId")

	body := new(category.CategoryUpdateInput)
	if err := c.Bind(&body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	slog.Info("[CategoryController.Update] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.HandleHttpError(c, err)
	}

	input := category.CategoryUpdateInput{
		Name: body.Name,
		Type: body.Type,
	}
	res, err := h.CategoryUpdateUsecase.Execute(categoryId, input)
	if err != nil {
		return helpers.HandleHttpError(c, err)
	}
	return c.JSON(http.StatusOK, res)
}

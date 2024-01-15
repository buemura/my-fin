package controllers

import (
	"log/slog"
	"net/http"

	"github.com/buemura/my-fin/internal/api/helpers"
	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/buemura/my-fin/pkg/utils"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type UserController struct {
	userSigninUsecase usecase.UserSigninUsecase
	userSignupUsecase usecase.UserSignupUsecase
}

func NewUserController(
	userSigninUsecase usecase.UserSigninUsecase,
	userSignupUsecase usecase.UserSignupUsecase,
) *UserController {
	return &UserController{
		userSigninUsecase: userSigninUsecase,
		userSignupUsecase: userSignupUsecase,
	}
}

func (h *UserController) SignupUser(c echo.Context) error {
	slog.Info("[UserController.SignupUser] - Validating parameters")
	body := new(user.UserSignupInput)
	if err := c.Bind(&body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	slog.Info("[UserController.SignupUser] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	input := user.UserSignupInput{
		Name:     body.Name,
		Email:    body.Email,
		Password: body.Password,
	}

	res, err := h.userSignupUsecase.Execute(input)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	return c.JSON(http.StatusCreated, res)
}

func (h *UserController) SigninUser(c echo.Context) error {
	slog.Info("[UserController.SigninUser] - Validating parameters")
	body := new(user.UserSigninInput)
	if err := c.Bind(&body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	slog.Info("[UserController.SigninUser] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	input := user.UserSigninInput{
		Email:    body.Email,
		Password: body.Password,
	}
	res, err := h.userSigninUsecase.Execute(input)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	return c.JSON(http.StatusOK, res)
}

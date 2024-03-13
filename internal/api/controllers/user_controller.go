package controllers

import (
	"log/slog"
	"net/http"

	"github.com/buemura/my-fin/internal/api/helpers"
	"github.com/buemura/my-fin/internal/api/middleware"
	"github.com/buemura/my-fin/internal/application/usecase"
	"github.com/buemura/my-fin/internal/constant"
	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/buemura/my-fin/pkg/utils"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type UserController struct {
	userSigninUsecase usecase.UserSigninUsecase
	userSignupUsecase usecase.UserSignupUsecase
	userGetUsecase    usecase.UserGetUsecase
}

func NewUserController(
	userSigninUsecase usecase.UserSigninUsecase,
	userSignupUsecase usecase.UserSignupUsecase,
	userGetUsecase usecase.UserGetUsecase,
) *UserController {
	return &UserController{
		userSigninUsecase: userSigninUsecase,
		userSignupUsecase: userSignupUsecase,
		userGetUsecase:    userGetUsecase,
	}
}

func (h *UserController) SignupUser(c echo.Context) error {
	slog.Info("[UserController.SignupUser] - Validating parameters")
	body := new(user.SignUpUserIn)
	if err := c.Bind(&body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	slog.Info("[UserController.SignupUser] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	input := user.SignUpUserIn{
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
	body := new(user.SignInUserIn)
	if err := c.Bind(&body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	slog.Info("[UserController.SigninUser] - Request body: " + utils.StructStringfy(&body))
	validate := validator.New()
	if err := validate.Struct(body); err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	input := user.SignInUserIn{
		Email:    body.Email,
		Password: body.Password,
	}
	res, err := h.userSigninUsecase.Execute(input)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	return c.JSON(http.StatusOK, res)
}

func (h *UserController) GetMe(c echo.Context) error {
	slog.Info("[UserController.GetMe] - Validating token")
	user, ok := c.Get(constant.UserContextKey).(middleware.RquestUser)
	if !ok {
		return helpers.BuildErrorResponse(c, "permission denied")
	}

	res, err := h.userGetUsecase.Execute(user.ID)
	if err != nil {
		return helpers.BuildErrorResponse(c, err.Error())
	}

	return c.JSON(http.StatusOK, res)
}

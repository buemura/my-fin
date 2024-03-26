package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/api/middleware"
	"github.com/buemura/my-fin/internal/application/usecase"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/labstack/echo/v4"
)

func setupAccountRouter(app *echo.Group) {
	accountRepo := repositories.NewPgxAccountRepository()
	accountCreateUsecase := usecase.NewAccountCreateUsecase(accountRepo)
	accountDeleteUsecase := usecase.NewAccountDeleteUsecase(accountRepo)
	accountGetUsecase := usecase.NewAccountGetUsecase(accountRepo)
	accountListUsecase := usecase.NewAccountListUsecase(accountRepo)
	accountUpdateUsecase := usecase.NewAccountUpdateUsecase(accountRepo)
	accountController := controllers.NewAccountController(
		*accountCreateUsecase,
		*accountDeleteUsecase,
		*accountGetUsecase,
		*accountListUsecase,
		*accountUpdateUsecase,
	)

	app.GET("/accounts", accountController.List, middleware.EnsureAuth)
	app.GET("/accounts/:accountId", accountController.Get, middleware.EnsureAuth)
	app.POST("/accounts", accountController.Create, middleware.EnsureAuth)
	app.PUT("/accounts/:accountId", accountController.Update, middleware.EnsureAuth)
	app.DELETE("/accounts/:accountId", accountController.Delete, middleware.EnsureAuth)
}

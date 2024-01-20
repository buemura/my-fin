package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/labstack/echo/v4"
)

func setupAccountRouter(app *echo.Group) {
	accountRepo := repositories.NewGormAccountRepository()
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

	a := app.Group("/user/:userId")
	a.GET("/accounts", accountController.List)
	a.GET("/accounts/:accountId", accountController.Get)
	a.POST("/accounts", accountController.Create)
	a.PUT("/accounts/:accountId", accountController.Update)
	a.DELETE("/accounts/:accountId", accountController.Delete)
}

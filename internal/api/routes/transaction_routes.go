package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/api/middleware"
	"github.com/buemura/my-fin/internal/application/usecase"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/labstack/echo/v4"
)

func setupTransactionRouter(app *echo.Group) {
	transactionRepo := repositories.NewPgxTransactionRepository()
	transactionCreateUsecase := usecase.NewTransactionCreateUsecase(transactionRepo)
	transactionDeleteUsecase := usecase.NewTransactionDeleteUsecase(transactionRepo)
	transactionListUsecase := usecase.NewTransactionListUsecase(transactionRepo)
	transactionGetUsecase := usecase.NewTransactionGetUsecase(transactionRepo)
	transactionUpdateUsecase := usecase.NewTransactionUpdateUsecase(transactionRepo)
	transactionController := controllers.NewTransactionController(
		*transactionCreateUsecase,
		*transactionDeleteUsecase,
		*transactionListUsecase,
		*transactionGetUsecase,
		*transactionUpdateUsecase,
	)

	app.GET("/transactions", transactionController.List, middleware.EnsureAuth)
	app.GET("/transactions/:transactionId", transactionController.Get, middleware.EnsureAuth)
	app.POST("/transactions", transactionController.Create, middleware.EnsureAuth)
	app.PUT("/transactions/:transactionId", transactionController.Update, middleware.EnsureAuth)
	app.DELETE("/transactions/:transactionId", transactionController.Delete, middleware.EnsureAuth)
}

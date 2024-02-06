package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/api/middleware"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/labstack/echo/v4"
)

func setupTransactionRouter(app *echo.Group) {
	transactionRepo := repositories.NewGormTransactionRepository()
	transactionCreateUsecase := usecase.NewTransactionCreateUsecase(transactionRepo)
	transactionDeleteUsecase := usecase.NewTransactionDeleteUsecase(transactionRepo)
	transactionListUsecase := usecase.NewTransactionListUsecase(transactionRepo)
	transactionUpdateUsecase := usecase.NewTransactionUpdateUsecase(transactionRepo)
	transactionController := controllers.NewTransactionController(
		*transactionCreateUsecase,
		*transactionDeleteUsecase,
		*transactionListUsecase,
		*transactionUpdateUsecase,
	)

	a := app.Group("/user/:userId")
	a.GET("/transaction", transactionController.List, middleware.EnsureAuth)
	a.POST("/transaction", transactionController.Create, middleware.EnsureAuth)
	a.PUT("/transaction/:transactionId", transactionController.Update, middleware.EnsureAuth)
	a.DELETE("/transaction/:transactionId", transactionController.Delete, middleware.EnsureAuth)
}

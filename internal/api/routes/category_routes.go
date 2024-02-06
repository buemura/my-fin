package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/labstack/echo/v4"
)

func setupCategorytRouter(app *echo.Group) {
	categoryRepo := repositories.NewGormCategoryRepository()
	accountCreateUsecase := usecase.NewCategoryCreateUsecase(categoryRepo)
	accountDeleteUsecase := usecase.NewCategoryDeleteUsecase(categoryRepo)
	accountListUsecase := usecase.NewCategoryListUsecase(categoryRepo)
	accountUpdateUsecase := usecase.NewCategoryUpdateUsecase(categoryRepo)
	accountController := controllers.NewCategoryController(
		*accountCreateUsecase,
		*accountDeleteUsecase,
		*accountListUsecase,
		*accountUpdateUsecase,
	)

	app.GET("/category", accountController.List)
	app.POST("/category", accountController.Create)
	app.PUT("/category/:accountId", accountController.Update)
	app.DELETE("/category/:accountId", accountController.Delete)
}

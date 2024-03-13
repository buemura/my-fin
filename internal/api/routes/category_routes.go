package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/application/usecase"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/labstack/echo/v4"
)

func setupCategorytRouter(app *echo.Group) {
	categoryRepo := repositories.NewPgxCategoryRepository()
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

	app.GET("/categories", accountController.List)
	app.POST("/categories", accountController.Create)
	app.PUT("/categories/:categoryId", accountController.Update)
	app.DELETE("/categories/:categoryId", accountController.Delete)
}

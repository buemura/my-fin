package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/buemura/my-fin/internal/usecase"
	"github.com/labstack/echo/v4"
)

func setupUserRouter(app *echo.Group) {
	userRepo := repositories.NewGormUserRepository()
	userSigninUsecase := usecase.NewUserSigninUsecase(userRepo)
	userSignupUsecase := usecase.NewUserSignupUsecase(userRepo)
	userController := controllers.NewUserController(*userSigninUsecase, *userSignupUsecase)

	u := app.Group("/user")
	u.POST("/signup", userController.SignupUser)
	u.POST("/signin", userController.SigninUser)
}
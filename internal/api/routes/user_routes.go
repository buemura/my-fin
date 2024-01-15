package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/infra/container"
	"github.com/labstack/echo/v4"
)

func setupUserRouter(app *echo.Group) {
	userSigninUsecase := container.LoadUserSigninUsecase()
	userSignupUsecase := container.LoadUserSignupUsecase()
	userController := controllers.NewUserController(*userSigninUsecase, *userSignupUsecase)

	u := app.Group("/user")
	u.POST("/signup", userController.SignupUser)
	u.POST("/signin", userController.SigninUser)
}

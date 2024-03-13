package routes

import (
	"github.com/buemura/my-fin/internal/api/controllers"
	"github.com/buemura/my-fin/internal/api/middleware"
	"github.com/buemura/my-fin/internal/application/usecase"
	"github.com/buemura/my-fin/internal/infra/adapters"
	"github.com/buemura/my-fin/internal/infra/database/repositories"
	"github.com/labstack/echo/v4"
)

func setupUserRouter(app *echo.Group) {
	passHasher := adapters.NewBcryptPasswordHasher()
	tkGenerator := adapters.NewJwtTokenGenerator()

	userRepo := repositories.NewPgxUserRepository()
	userSignupUsecase := usecase.NewUserSignupUsecase(userRepo, passHasher)
	userSigninUsecase := usecase.NewUserSigninUsecase(userRepo, passHasher, tkGenerator)
	userGetUsecase := usecase.NewUserGetUsecase(userRepo)
	userController := controllers.NewUserController(*userSigninUsecase, *userSignupUsecase, *userGetUsecase)

	u := app.Group("/user")
	u.POST("/signup", userController.SignupUser)
	u.POST("/signin", userController.SigninUser)
	u.GET("/me", userController.GetMe, middleware.EnsureAuth)

}

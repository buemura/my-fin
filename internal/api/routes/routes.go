package routes

import (
	"github.com/labstack/echo/v4"
)

func SetupRoutes(app *echo.Echo) {
	router := app.Group("/api")
	setupUserRouter(router)
	setupAccountRouter(router)
	setupCategorytRouter(router)
}

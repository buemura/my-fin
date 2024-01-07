package main

import (
	"log/slog"
	"os"

	"github.com/buemura/my-fin/internal/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func setupServerMiddlewares(e *echo.Echo) {
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.Use(middleware.CSRF())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `{"time":"${time_rfc3339_nano}",` +
			`"remote_ip":"${remote_ip}",` +
			`"method":"${method}",` +
			`"uri":"${uri}",` +
			`"status":"${status}",` +
			`"latency":"${latency}"}\n`,
	}))
	e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20)))
	// web.RegisterHandlers(e) // To embed react with go
	routes.SetupRoutes(e)
	e.File("*", "web/dist")
}

func main() {
	// Logger
	slogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(slogger)

	// Http Server
	app := echo.New()
	setupServerMiddlewares(app)

	if err := app.Start(":8080"); err != nil {
		slog.Error(err.Error())
	}
}

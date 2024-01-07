package main

import (
	"log/slog"
	"os"

	"github.com/buemura/my-fin/internal/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func setupServerMiddlewares(app *echo.Echo) {
	app.Use(middleware.Recover())
	app.Use(middleware.CORS())
	// app.Use(middleware.CSRF())
	app.Use(middleware.Secure())
	app.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `{"time":"${time_rfc3339_nano}",` +
			`"remote_ip":"${remote_ip}",` +
			`"method":"${method}",` +
			`"uri":"${uri}",` +
			`"status":"${status}",` +
			`"latency":"${latency}"}\n`,
	}))
	app.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20)))
	routes.SetupRoutes(app)
}

func main() {
	// Logger
	slogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(slogger)

	// Http Server
	app := echo.New()
	setupServerMiddlewares(app)

	if err := app.Start("127.0.0.1:8080"); err != nil {
		slog.Error(err.Error())
	}
}

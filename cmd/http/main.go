package main

import (
	"log/slog"
	"os"

	"github.com/buemura/my-fin/config"
	"github.com/buemura/my-fin/db/migrations"
	"github.com/buemura/my-fin/internal/api/routes"
	"github.com/buemura/my-fin/internal/infra/database"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func init() {
	config.LoadEnv()
	database.Connect()
	migrations.Migrate()
}

func main() {
	// Logger
	slogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(slogger)

	// Http Server
	app := echo.New()
	setupServerMiddlewares(app)

	host := ":" + config.PORT
	if err := app.Start(host); err != nil {
		slog.Error(err.Error())
	}
}

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

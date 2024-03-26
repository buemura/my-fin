package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/buemura/my-fin/config"
	"github.com/buemura/my-fin/internal/api/routes"
	"github.com/buemura/my-fin/internal/infra/database"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func init() {
	config.LoadEnv()
	database.Connect()
	database.Migrate()
}

func main() {
	// Logger
	slogger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(slogger)

	// Http Server
	app := echo.New()

	// Middlewares
	app.Use(middleware.Recover())
	app.Use(middleware.CORS())
	app.Use(middleware.Secure())
	app.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20)))
	app.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `{"time":"${time_rfc3339_nano}",` +
			`"remote_ip":"${remote_ip}",` +
			`"method":"${method}",` +
			`"uri":"${uri}",` +
			`"status":"${status}",` +
			`"latency":"${latency}"}\n`,
	}))
	routes.SetupRoutes(app)

	host := ":" + config.PORT
	go func() {
		if err := app.Start(host); err != nil && http.ErrServerClosed != err {
			panic(err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, os.Interrupt, syscall.SIGINT)
	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	fmt.Println("Stopping...")

	if err := app.Shutdown(ctx); err != nil {
		panic(err)
	}
	fmt.Println("Server stopped")
}

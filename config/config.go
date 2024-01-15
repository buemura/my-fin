package config

import (
	"github.com/buemura/my-fin/db/migrations"
	"github.com/buemura/my-fin/internal/infra/database"
)

func LoadConfigs() {
	loadEnvVariables()
	database.Connect()
	migrations.Migrate()
}

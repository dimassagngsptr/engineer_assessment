package migrations

import (
	"crud-backend-test/src/configs"
	"crud-backend-test/src/models"
)

func Migration() {
	configs.DB.AutoMigrate(&models.User{}, models.Todo{})
}

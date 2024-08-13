package main

import (
	"crud-backend-test/src/configs"
	"crud-backend-test/src/migrations"
	"crud-backend-test/src/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders: "Content-Type,Authorization",
	}))
	configs.InitDB()

	migrations.Migration()
	routes.Router(app)

	app.Listen(":3000")
}

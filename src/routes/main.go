package routes

import (
	"crud-backend-test/src/controllers"
	"crud-backend-test/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Router(app *fiber.App) {
	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.JSON(fiber.Map{
			"uri":     ctx.Request().URI().String(),
			"path":    ctx.Path(),
			"message": "Server is running.",
		})
	})
	api := app.Group("/v1")
	api.Post("/register", controllers.CreateUser)
	api.Post("/login", controllers.LoginUser)
	api.Get("/profile", middlewares.JwtMiddleware(), controllers.GetDetailUser)
	api.Put("/subscriptions", middlewares.JwtMiddleware(), controllers.UserSubscription)

	api.Post("/todo", middlewares.JwtMiddleware(), controllers.CreateTodo)
	api.Put("/todo/:id", middlewares.JwtMiddleware(), controllers.UpdateTodo)
	api.Delete("/todo/:id", middlewares.JwtMiddleware(), controllers.DeleteTodo)
}

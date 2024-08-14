package controllers

import (
	"crud-backend-test/src/helpers"
	"crud-backend-test/src/middlewares"
	"crud-backend-test/src/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateTodo(c *fiber.Ctx) error {
	var input models.RequestTodos
	claims := middlewares.GetUserClaims(c)

	if claims == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}
	userId, ok := claims["id"].(float64)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":  "Invalid token claims",
			"claims": claims,
		})
	}
	userEmail, ok := claims["email"].(string)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":  "Invalid token claims",
			"claims": claims,
		})
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Failed to parse request body",
			"error":   err.Error(),
		})
	}
	policy := middlewares.XSSClean(&input).(*models.RequestTodos)
	if errors := helpers.ValidateStruct(policy); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(errors)
	}
	user := models.GetDetailUser(userEmail)

	countTodos := helpers.CountData("todos", int(userId))
	if countTodos >= 10 && !user.IsSubscribed {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": fmt.Sprintf("You have an limit todos, please subscribe before, your todos now is %v", countTodos),
			"limit":   10,
		})
	}

	newTodo := models.Todo{
		Title:       input.Title,
		Description: input.Description,
		UserID:      int(userId),
	}

	if err := models.CreateTodo(&newTodo); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create todo",
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Success create new todo",
	})
}

func UpdateTodo(c *fiber.Ctx) error {
	var input models.RequestTodos
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid ID",
		})
	}

	foundTodo := models.GetTodoById(id)
	if foundTodo == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Todo not found",
		})
	}

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Failed to parse request body",
			"error":   err.Error(),
		})
	}

	policy := middlewares.XSSClean(&input).(*models.RequestTodos)
	if errors := helpers.ValidateStruct(policy); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(errors)
	}

	updateFields := map[string]interface{}{
		"title":       policy.Title,
		"description": policy.Description,
		"completed":   policy.Completed,
	}

	if err := models.UpdateTodo(id, updateFields); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to update todo",
			"error":   err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Success updated todo",
		"data":    updateFields,
	})
}

func DeleteTodo(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	if err := models.DeleteTodo(id); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to delete todo",
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Successfully deleted todo",
	})
}

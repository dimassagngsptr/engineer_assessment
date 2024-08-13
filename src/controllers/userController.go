package controllers

import (
	"crud-backend-test/src/helpers"
	"crud-backend-test/src/middlewares"
	"crud-backend-test/src/models"
	"os"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(c *fiber.Ctx) error {
	var input models.User
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Failed to parse request body",
			"error":   err.Error(),
		})
	}
	newUser := middlewares.XSSClean(&input).(*models.User)

	if errors := helpers.ValidateStruct(newUser); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(errors)
	}
	if existUser := models.GetDetailUser(newUser.Email); existUser.ID != 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Email already exists",
		})
	}
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal server error",
			"error":   err.Error(),
		})
	}
	newUser.Password = string(hashPassword)

	result, err := models.CreateUser(newUser)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal server error",
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"message":    "Account has been created",
		"data":       result,
	})
}

func LoginUser(c *fiber.Ctx) error {
	var input models.LoginUser
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Failed to parse request body",
			"error":   err.Error(),
		})
	}	
	user := middlewares.XSSClean(&input).(*models.LoginUser)
	if errors := helpers.ValidateStruct(user); len(errors) > 0 {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(errors)
	}
	userExists := models.GetDetailUser(user.Email)
	if userExists.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User does not exist",
		})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(userExists.Password), []byte(user.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status":     "unauthorized",
			"statusCode": 401,
			"message":    "Invalid password",
		})
	}
	payload := map[string]interface{}{
		"id":           userExists.ID,
		"email":        userExists.Email,
		"is_subscribed": userExists.IsSubscribed,
	}
	secretKey := os.Getenv("JWT_KEY")
	if secretKey == "" {
		secretKey = "jwt_key"
	}
	token, err := middlewares.GenerateToken(secretKey, payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to generate token",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"user":       userExists,
		"token":      token,
	})
}

func GetDetailUser(c *fiber.Ctx) error {
	claims := middlewares.GetUserClaims(c)
	if claims == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}
	userEmail := claims["email"].(string)
	user := models.GetDetailUser(userEmail)
	if user.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status":     "success",
		"statusCode": 200,
		"user":       user,
		"message":    "Successfully get user",
	})
}

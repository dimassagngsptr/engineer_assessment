package middlewares

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(secretKey string, payload map[string]interface{}) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	for key, value := range payload {
		claims[key] = value
	}

	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func ExtractToken(c *fiber.Ctx) string {
	bearerToken := c.Get("Authorization")
	if strings.HasPrefix(bearerToken, "Bearer ") {
		return strings.TrimPrefix(bearerToken, "Bearer ")
	}
	return ""
}

func JwtMiddleware() fiber.Handler {
	secretKey := os.Getenv("JWT_KEY")
	if secretKey == "" {
		secretKey = "jwt_key"
	}
	return func(c *fiber.Ctx) error {
		tokenString := ExtractToken(c)
		if tokenString == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized",
			})
		}
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(secretKey), nil
		})
		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized",
			})
		}
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Locals("userClaims", claims)
		} else {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized",
			})
		}
		return c.Next()
	}
}

func ValidateSubscribed() fiber.Handler {
	return func(c *fiber.Ctx) error {
		claims := GetUserClaims(c)
		if claims == nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"message": "Unauthorized",
			})
		}
		isSubcribed, ok := claims["is_subscibed"].(bool)
		if !ok || !isSubcribed {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"Forbidden": "You don't have permission to access this resource, please subscribe before",
			})
		}
		return c.Next()
	}
}

var GetUserClaims = func(c *fiber.Ctx) jwt.MapClaims {
	if claims, ok := c.Locals("userClaims").(jwt.MapClaims); ok {
		return claims
	}
	return nil
}

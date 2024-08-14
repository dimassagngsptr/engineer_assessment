package models

import (
	"crud-backend-test/src/configs"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name         string    `json:"name" validate:"required"`
	Email        string    `json:"email" validate:"required,email"`
	Password     string    `json:"password" validate:"required,min=8"`
	IsSubscribed bool      `json:"is_subscribed" gorm:"default:false"`
	Todo         []APITodo `json:"todo"`
}
type APITodo struct {
	gorm.Model
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required,min=3,max=1024"`
	Completed   bool   `json:"completed"`
	UserID      int    `json:"user_id" validate:"required"`
}

type LoginUser struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func GetAllUsers() []*User {
	var users []*User
	configs.DB.Find(&users)
	return users
}

func CreateUser(newUser *User) (*User, error) {
	result := configs.DB.Create(&newUser)
	if result.Error != nil {
		return nil, result.Error
	}
	return newUser, nil
}

func GetDetailUser(email string) *User {
	var user User
	configs.DB.Preload("Todo", func(db *gorm.DB) *gorm.DB {
		var todo []*APITodo
		return db.Model(&Todo{}).Find(&todo)
	}).First(&user, "email = ?", email)
	return &user
}

func UserSubscription(id int) error {
	result := configs.DB.Model(&User{}).Where("id = ?", id).Update("is_subscribed", true)
	return result.Error
}

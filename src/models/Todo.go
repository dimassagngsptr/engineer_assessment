package models

import (
	"crud-backend-test/src/configs"
	"strings"
	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	Title       string    `json:"title" validate:"required"`
	Description string    `json:"description" validate:"required,min=3,max=1024"`
	Completed   bool      `json:"completed" gorm:"default:false"`
	UserID      int       `json:"user_id"`
	User        User      `gorm:"foreignKey:UserID"`
}

type RequestTodos struct {
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required,min=3,max=1024"`
	Completed   bool   `json:"completed" gorm:"default:false"`
}

func CreateTodo(newTodo *Todo) error {
	result := configs.DB.Create(&newTodo)
	return result.Error
}

func UpdateTodo(id int, updateFields map[string]interface{}) error {
	result := configs.DB.Model(&Todo{}).Where("id = ?", id).Updates(updateFields)
	return result.Error
}

func CompletedTodo(id int) error {
	result := configs.DB.Model(&Todo{}).Where("id = ?", id).Update("completed", true)
	return result.Error
}

func DeleteTodo(id int) error {
	result := configs.DB.Delete(&Todo{}, "id = ?", id)
	return result.Error
}

func GetTodoById(id int) *Todo {
	var item Todo
	configs.DB.First(&item, "id = ?", id)
	return &item
}

func GetTodos(userId int, sort, sortBy string) ([]*Todo, error) {
	var todos []*Todo
	if sort == "" {
		sort = "ASC"
	}
	if sortBy == "" {
		sortBy = "deadline"
	}
	sort = sortBy + " " + strings.ToLower(sort)
	result := configs.DB.Preload("User").Order(sort).Where("user_id = ?", userId).Find(&todos)
	if result.Error != nil {
		return nil, result.Error
	}
	return todos, nil
}

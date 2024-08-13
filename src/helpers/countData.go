package helpers

import "crud-backend-test/src/configs"

func CountData(table string, userId int) int64 {
	var result int64
	configs.DB.Table(table).Where("user_id = ? AND deleted_at IS NULL", userId).Count(&result)
	return result
}

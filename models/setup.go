package models

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("todo.db"), &gorm.Config{})
	if err != nil {
		panic("データベースへの接続に失敗しました")
	}

	err = database.AutoMigrate(&Todo{})
	if err != nil {
		panic("マイグレーションに失敗しました")
	}

	DB = database
	fmt.Println("データベース接続に成功しました")
} 
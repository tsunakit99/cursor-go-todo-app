package main

import (
	"github.com/tsunakit99/cursor-go-todo-app/models"
	"github.com/tsunakit99/cursor-go-todo-app/routes"
)

func main() {
	// データベース接続
	models.ConnectDatabase()

	// ルーターをセットアップして起動
	r := routes.SetupRouter()
	r.Run(":8080")
}

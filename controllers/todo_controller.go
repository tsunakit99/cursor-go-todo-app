package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tsunakit99/cursor-go-todo-app/models"
)

// GetTodos godoc
// @Summary すべてのTodoを取得
// @Description すべてのTodoアイテムをリストで取得します
// @Tags todos
// @Accept  json
// @Produce  json
// @Success 200 {array} models.Todo
// @Router /todos [get]
func GetTodos(c *gin.Context) {
	var todos []models.Todo
	models.DB.Find(&todos)

	c.JSON(http.StatusOK, todos)
}

// CreateTodo godoc
// @Summary 新しいTodoを作成
// @Description 新しいTodoアイテムを作成します
// @Tags todos
// @Accept  json
// @Produce  json
// @Param todo body models.Todo true "Todo JSON"
// @Success 201 {object} models.Todo
// @Router /todos [post]
func CreateTodo(c *gin.Context) {
	var input models.Todo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	todo := models.Todo{
		Title:     input.Title,
		Completed: input.Completed,
	}
	models.DB.Create(&todo)

	c.JSON(http.StatusCreated, todo)
}

// GetTodo godoc
// @Summary 特定のTodoを取得
// @Description IDによって特定のTodoを取得します
// @Tags todos
// @Accept  json
// @Produce  json
// @Param id path int true "Todo ID"
// @Success 200 {object} models.Todo
// @Router /todos/{id} [get]
func GetTodo(c *gin.Context) {
	var todo models.Todo

	if err := models.DB.Where("id = ?", c.Param("id")).First(&todo).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "レコードが見つかりません"})
		return
	}

	c.JSON(http.StatusOK, todo)
}

// UpdateTodo godoc
// @Summary Todoを更新
// @Description 特定のTodoを更新します
// @Tags todos
// @Accept  json
// @Produce  json
// @Param id path int true "Todo ID"
// @Param todo body models.Todo true "Todo JSON"
// @Success 200 {object} models.Todo
// @Router /todos/{id} [put]
func UpdateTodo(c *gin.Context) {
	var todo models.Todo
	if err := models.DB.Where("id = ?", c.Param("id")).First(&todo).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "レコードが見つかりません"})
		return
	}

	var input models.Todo
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 更新前のデータをログ出力
	fmt.Printf("更新前: ID=%d, Title=%s, Completed=%v\n", todo.ID, todo.Title, todo.Completed)
	fmt.Printf("入力データ: Title=%s, Completed=%v\n", input.Title, input.Completed)

	// 直接更新
	if err := models.DB.Model(&todo).Updates(map[string]interface{}{
		"title":     input.Title,
		"completed": input.Completed,
	}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新に失敗しました"})
		return
	}

	// 更新後のデータを再取得
	if err := models.DB.First(&todo, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新後のデータの取得に失敗しました"})
		return
	}

	fmt.Printf("更新後: ID=%d, Title=%s, Completed=%v\n", todo.ID, todo.Title, todo.Completed)

	c.JSON(http.StatusOK, todo)
}

// DeleteTodo godoc
// @Summary Todoを削除
// @Description 特定のTodoを削除します
// @Tags todos
// @Accept  json
// @Produce  json
// @Param id path int true "Todo ID"
// @Success 200 {object} gin.H
// @Router /todos/{id} [delete]
func DeleteTodo(c *gin.Context) {
	var todo models.Todo
	if err := models.DB.Where("id = ?", c.Param("id")).First(&todo).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "レコードが見つかりません"})
		return
	}

	models.DB.Delete(&todo)

	c.JSON(http.StatusOK, gin.H{"data": true})
} 
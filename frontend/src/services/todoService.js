import axios from 'axios';

const API_URL = '/api/v1';

const TodoService = {
  // すべてのTodoを取得
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // 新しいTodoを作成
  create: async (todo) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Todoを更新
  update: async (id, todo) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, todo);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      throw error;
    }
  },

  // Todoを削除
  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  }
};

export default TodoService; 
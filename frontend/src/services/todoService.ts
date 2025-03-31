import axios, { AxiosResponse } from 'axios';
import { Todo, TodoInput } from '../types/todo';

const API_URL = '/api/v1';

const TodoService = {
  // すべてのTodoを取得
  getAll: async (): Promise<Todo[]> => {
    try {
      const response: AxiosResponse<Todo[]> = await axios.get(`${API_URL}/todos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // 新しいTodoを作成
  create: async (todo: TodoInput): Promise<Todo> => {
    try {
      const response: AxiosResponse<Todo> = await axios.post(`${API_URL}/todos`, todo);
      return response.data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Todoを更新
  update: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
    try {
      console.log('更新リクエスト:', { id, todo });
      const response: AxiosResponse<Todo> = await axios.put(`${API_URL}/todos/${id}`, todo);
      console.log('更新レスポンス:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      throw error;
    }
  },

  // Todoを削除
  delete: async (id: number): Promise<{ data: boolean }> => {
    try {
      const response: AxiosResponse<{ data: boolean }> = await axios.delete(`${API_URL}/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  }
};

export default TodoService; 
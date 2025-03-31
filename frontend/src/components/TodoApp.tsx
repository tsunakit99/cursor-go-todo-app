import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import TodoService from '../services/todoService';
import { NotificationState, Todo, TodoInput } from '../types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'success'
  });

  // 初期ロード
  useEffect(() => {
    fetchTodos();
  }, []);

  // 通知を表示
  const showNotification = (message: string, severity: NotificationState['severity'] = 'success'): void => {
    setNotification({ open: true, message, severity });
  };

  // 通知を閉じる
  const closeNotification = (_event?: SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  // すべてのTodoを取得
  const fetchTodos = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await TodoService.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('タスクの読み込みに失敗しました');
      showNotification('タスクの読み込みに失敗しました', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 新しいTodoを追加
  const handleAddTodo = async (todo: TodoInput): Promise<void> => {
    try {
      const newTodo = await TodoService.create(todo);
      setTodos([...todos, newTodo]);
      showNotification('タスクを追加しました');
    } catch (err) {
      showNotification('タスクの追加に失敗しました', 'error');
    }
  };

  // Todoの完了状態を切り替え
  const handleToggleComplete = async (id: number, completed: boolean): Promise<void> => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await TodoService.update(id, { 
        title: todoToUpdate.title,
        completed 
      });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      showNotification(completed ? 'タスクを完了しました' : 'タスクを未完了に戻しました');
    } catch (err) {
      showNotification('タスクの更新に失敗しました', 'error');
    }
  };

  // Todoを更新
  const handleUpdateTodo = async (id: number, title: string): Promise<void> => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = await TodoService.update(id, { ...todoToUpdate, title });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      showNotification('タスクを更新しました');
    } catch (err) {
      showNotification('タスクの更新に失敗しました', 'error');
    }
  };

  // Todoを削除
  const handleDeleteTodo = async (id: number): Promise<void> => {
    try {
      await TodoService.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
      showNotification('タスクを削除しました');
    } catch (err) {
      showNotification('タスクの削除に失敗しました', 'error');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Todoアプリ
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          タスクを管理して生産性を向上させましょう
        </Typography>
      </Box>

      <TodoForm onAdd={handleAddTodo} />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
          <Typography>読み込み中...</Typography>
        </Box>
      ) : (
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TodoApp; 
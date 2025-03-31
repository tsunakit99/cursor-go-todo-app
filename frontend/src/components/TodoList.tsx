import { Box, Divider, List, Paper, Typography } from '@mui/material';
import React from 'react';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete, onUpdate }) => {
  // 完了/未完了でタスクを分類
  const completedTodos: Todo[] = todos.filter(todo => todo.completed);
  const activeTodos: Todo[] = todos.filter(todo => !todo.completed);

  // タスクが1つもない場合のメッセージ
  if (todos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
        <Typography variant="h6">タスクがありません</Typography>
        <Typography variant="body2">新しいタスクを追加してください</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={2}>
      {activeTodos.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ p: 2, pb: 0 }}>
            未完了のタスク ({activeTodos.length})
          </Typography>
          <List>
            {activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </List>
        </>
      )}

      {activeTodos.length > 0 && completedTodos.length > 0 && <Divider />}

      {completedTodos.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ p: 2, pb: 0 }}>
            完了したタスク ({completedTodos.length})
          </Typography>
          <List>
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default TodoList; 
import { Box, Divider, Fade, List, Paper, Typography } from '@mui/material';
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
      <Fade in timeout={500}>
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            p: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <Typography variant="h6" color="text.primary" gutterBottom>
            タスクがありません
          </Typography>
          <Typography variant="body1" color="text.secondary">
            新しいタスクを追加してください
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }}
    >
      {activeTodos.length > 0 && (
        <Fade in timeout={500}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                p: 3,
                pb: 1,
                color: 'primary.main',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              未完了のタスク
              <Typography
                component="span"
                sx={{
                  bgcolor: 'primary.light',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '0.875rem',
                }}
              >
                {activeTodos.length}
              </Typography>
            </Typography>
            <List sx={{ px: 2 }}>
              {activeTodos.map((todo, index) => (
                <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={todo.id}>
                  <Box>
                    <TodoItem
                      todo={todo}
                      onToggleComplete={onToggleComplete}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                    />
                  </Box>
                </Fade>
              ))}
            </List>
          </Box>
        </Fade>
      )}

      {activeTodos.length > 0 && completedTodos.length > 0 && (
        <Divider sx={{ my: 2, borderColor: 'divider' }} />
      )}

      {completedTodos.length > 0 && (
        <Fade in timeout={500}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                p: 3,
                pb: 1,
                color: 'secondary.main',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              完了したタスク
              <Typography
                component="span"
                sx={{
                  bgcolor: 'secondary.light',
                  color: 'white',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '0.875rem',
                }}
              >
                {completedTodos.length}
              </Typography>
            </Typography>
            <List sx={{ px: 2 }}>
              {completedTodos.map((todo, index) => (
                <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={todo.id}>
                  <Box>
                    <TodoItem
                      todo={todo}
                      onToggleComplete={onToggleComplete}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                    />
                  </Box>
                </Fade>
              ))}
            </List>
          </Box>
        </Fade>
      )}
    </Paper>
  );
};

export default TodoList; 
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fade, Paper, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TodoInput } from '../types/todo';

interface TodoFormProps {
  onAdd: (todo: TodoInput) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (title.trim() !== '') {
      onAdd({ title, completed: false });
      setTitle('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  return (
    <Fade in timeout={500}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="新しいタスクを入力"
            value={title}
            onChange={handleChange}
            placeholder="例: 買い物に行く"
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.1)',
                },
              },
              '& .MuiInputLabel-root': {
                transition: 'all 0.2s ease',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            disabled={!title.trim()}
            sx={{
              minWidth: '100px',
              height: '40px',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)',
              },
              '&:disabled': {
                transform: 'none',
                boxShadow: 'none',
              },
            }}
          >
            追加
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default TodoForm; 
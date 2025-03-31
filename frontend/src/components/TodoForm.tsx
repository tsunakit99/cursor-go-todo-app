import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TodoInput } from '../types/todo';

interface TodoFormProps {
  onAdd: (todo: TodoInput) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');

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
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="新しいタスクを入力"
          value={title}
          onChange={handleChange}
          placeholder="例: 買い物に行く"
          autoFocus
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          disabled={!title.trim()}
          sx={{ 
            minWidth: '80px',
            whiteSpace: 'nowrap'
          }}
        >
          追加
        </Button>
      </Box>
    </Paper>
  );
};

export default TodoForm; 
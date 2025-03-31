import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      onAdd({ title, completed: false });
      setTitle('');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="新しいタスクを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例: 買い物に行く"
          autoFocus
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          disabled={!title.trim()}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          追加
        </Button>
      </Box>
    </Paper>
  );
};

export default TodoForm; 
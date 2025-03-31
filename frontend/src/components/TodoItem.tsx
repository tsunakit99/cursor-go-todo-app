import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
    Checkbox,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Tooltip
} from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleToggle = (): void => {
    onToggleComplete(todo.id, !todo.completed);
  };

  const handleDelete = (): void => {
    onDelete(todo.id);
  };

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleCancel = (): void => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleSave = (): void => {
    if (editTitle.trim() !== '') {
      onUpdate(todo.id, editTitle);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditTitle(e.target.value);
  };

  return (
    <ListItem
      disablePadding
      sx={{
        mb: 1,
        '&:last-child': {
          mb: 0,
        },
      }}
    >
      <ListItemButton
        role={undefined}
        onClick={handleToggle}
        dense
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          borderRadius: 2,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            sx={{
              color: 'primary.main',
              '&.Mui-checked': {
                color: 'primary.main',
              },
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
          />
        </ListItemIcon>
        {isEditing ? (
          <TextField
            value={editTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            fullWidth
            autoFocus
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        ) : (
          <ListItemText
            primary={todo.title}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary',
              '& .MuiListItemText-primary': {
                fontSize: '1rem',
                fontWeight: 500,
              },
            }}
          />
        )}
      </ListItemButton>
      <Box
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: 1,
          opacity: isHovered || isEditing ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {isEditing ? (
          <>
            <Tooltip title="保存">
              <IconButton
                edge="end"
                aria-label="save"
                onClick={handleSave}
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                  },
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="キャンセル">
              <IconButton
                edge="end"
                aria-label="cancel"
                onClick={handleCancel}
                sx={{
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: 'error.light',
                    color: 'white',
                  },
                }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="編集">
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={handleEdit}
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white',
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="削除">
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDelete}
                sx={{
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: 'error.light',
                    color: 'white',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default TodoItem; 
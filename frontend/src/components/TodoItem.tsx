import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField
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
      secondaryAction={
        isEditing ? (
          <>
            <IconButton edge="end" aria-label="save" onClick={handleSave}>
              <SaveIcon color="primary" />
            </IconButton>
            <IconButton edge="end" aria-label="cancel" onClick={handleCancel}>
              <CancelIcon color="error" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </>
        )
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        {isEditing ? (
          <TextField
            fullWidth
            value={editTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <ListItemText
            primary={todo.title}
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary',
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem; 
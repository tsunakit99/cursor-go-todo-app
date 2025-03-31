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
import React, { useState } from 'react';

const TodoItem = ({ todo, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleSave = () => {
    if (editTitle.trim() !== '') {
      onUpdate(todo.id, editTitle);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
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
            onChange={(e) => setEditTitle(e.target.value)}
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
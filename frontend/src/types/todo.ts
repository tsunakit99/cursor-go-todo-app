export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type TodoInput = Pick<Todo, 'title' | 'completed'>;

export interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
} 
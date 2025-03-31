import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import TodoApp from './components/TodoApp';

// モダンなテーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#4dabf5',
    },
    secondary: {
      main: '#f4511e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoApp />
    </ThemeProvider>
  );
};

export default App; 
import { useState, useEffect } from 'react';
import { useAppDispatch } from './redux/store';
import {getme} from "./redux/auth"

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Router } from './router';

function App() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  useEffect(() => {
    dispatch(getme())
    const handleStorageChange = () => {
      setMode(localStorage.getItem('theme') as 'light' | 'dark');
    };

    window.addEventListener('storageUpdated', () => handleStorageChange());

    return () => {
      window.removeEventListener('storageUpdated', () => handleStorageChange());
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;

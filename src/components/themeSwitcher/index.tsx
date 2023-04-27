import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('storageUpdated'));
  };

  useEffect(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, []);
  return (
    <IconButton onClick={handleThemeChange} color="inherit">
      {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

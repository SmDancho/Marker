import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

enum themeType {
  dark = 'dark',
  light = 'light',
}

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<themeType>(
    (localStorage.getItem('theme') as themeType) || 'dark'
  );

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? themeType.light : themeType.dark);
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('storageUpdated'));
  };

  useEffect(() => {
    handleThemeChange();
  }, []);
  return (
    <IconButton onClick={handleThemeChange} color="inherit">
      {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};

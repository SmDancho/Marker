import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { MenuComponent } from '../../components/menu';
import { LangSwitcher } from '../../components/LangSwitcher';
import { Search } from '../../components/search';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../redux/store';

export const Header = () => {
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
    <header >
      <div className="max-w-[1440px] m-auto">
        <AppBar position="static">
          <Toolbar className="flex justify-between p-3">
            <div>
              <MenuComponent />
              <IconButton onClick={handleThemeChange} color="inherit">
                {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <LangSwitcher />
            </div>

            <div className="flex items-center">
              <Search />
            </div>

            <Link to={'/Profile'}>
              <IconButton size="large" color="inherit">
                <AccountCircle />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};

import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { MenuComponent } from '../../components/menu';
import { LangSwitcher } from '../../components/LangSwitcher';
import { Search } from '../../components/search';

import { useEffect, useState } from 'react';

export const Header = () => {
  return (
    <header>
      <div className="max-w-[1488px] m-auto ">
        <AppBar position="static">
          <Toolbar className="flex justify-between p-5">
            <div>
              <MenuComponent />
            </div>

            <div className="flex items-center">
              <Search />
            </div>
            <div>
              <Link to={'/Profile'}>
                <IconButton size="large" color="inherit">
                  <AccountCircle />
                </IconButton>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};

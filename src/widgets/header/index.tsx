import { Link } from 'react-router-dom';

import { IconButton, Toolbar, AppBar } from '@mui/material';

import { AccountCircle } from '@mui/icons-material';

import { MenuComponent } from '../../components/menu';

import { Search } from '../../components/search';

export const Header = () => {
  return (
    <header>
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
    </header>
  );
};

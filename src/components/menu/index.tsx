import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import { Link } from 'react-router-dom';

import { useState } from 'react';

import translate from '../../utils/i18/i18n';
import { useTranslation } from 'react-i18next';
export const MenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation();
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Link to={'/'}>
          <MenuItem>{translate.t('main')}</MenuItem>
        </Link>
      </Menu>
    </>
  );
};

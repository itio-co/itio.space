import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/userSlice';
import { useRouter } from 'next/router';
import { Avatar, Menu, MenuItem, IconButton, Typography } from '@mui/material';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    setAnchorEl(null);
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  if (!user.token) {
    return (
      <IconButton onClick={handleLogin} color="primary">
        <Typography variant="button" sx={{ color: 'white' }}>Login</Typography>
      </IconButton>
    );
  }

  const initial = user.email ? user.email[0].toUpperCase() : 'U';

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar>{initial}</Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>{user.email}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfile;

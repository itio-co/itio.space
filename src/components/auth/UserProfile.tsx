import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/userSlice';
import { useRouter } from 'next/router';
import { Avatar, Popover, IconButton, Divider } from '@mui/material';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    handleClose();
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleViewProfile = () => {
    handleClose();
    router.push('/profile');
  };

  if (!mounted || !user.token) {
    return (
      <button
        onClick={handleLogin}
        className="px-4 py-2 text-sm font-medium text-white rounded-full border border-white/20 hover:bg-white/10 transition-colors"
      >
        Sign in
      </button>
    );
  }

  const initial = user.email ? user.email[0].toUpperCase() : 'U';
  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        aria-label="Account"
        aria-haspopup="true"
        sx={{ p: 0.5 }}
      >
        <Avatar
          src={user.photoURL || undefined}
          sx={{
            width: 36,
            height: 36,
            fontSize: '0.95rem',
            fontWeight: 600,
            bgcolor: 'rgba(139, 92, 246, 0.7)',
            border: '2px solid rgba(255,255,255,0.15)',
          }}
        >
          {!user.photoURL && initial}
        </Avatar>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 320,
              borderRadius: '16px',
              bgcolor: '#1e1e2e',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            },
          },
        }}
      >
        {/* User info section */}
        <div className="flex flex-col items-center px-6 pt-6 pb-4">
          <Avatar
            src={user.photoURL || undefined}
            sx={{
              width: 64,
              height: 64,
              fontSize: '1.5rem',
              fontWeight: 600,
              bgcolor: 'rgba(139, 92, 246, 0.7)',
              mb: 1.5,
            }}
          >
            {!user.photoURL && initial}
          </Avatar>
          <p className="text-white font-semibold text-base">{displayName}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        {/* View profile button */}
        <div className="px-6 pb-4">
          <button
            onClick={handleViewProfile}
            className="w-full px-4 py-2 text-sm font-medium text-violet-300 rounded-full border border-violet-500/40 hover:bg-violet-500/15 transition-colors"
          >
            View profile
          </button>
        </div>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Sign out */}
        <div className="px-2 py-2">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </Popover>
    </div>
  );
};

export default UserProfile;

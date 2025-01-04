import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { toggleRole } from '@/redux/slices/userRoleSlice';
import { RootState } from '@/redux/store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.userRole.role);

  const handleToggleRole = () => {
    dispatch(toggleRole());
  };

  return (
    <AppBar position="static" color='inherit'>
      <Toolbar sx={{ display: 'flex', gap: '40px', marginLeft: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {role === 'admin' ? 'Admin' : 'User'}
          </Typography>
          <Switch
            checked={role === 'user'}
            onChange={handleToggleRole}
            color="secondary"
          />
        </Box>
        <IconButton aria-label="logout" color='inherit'>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

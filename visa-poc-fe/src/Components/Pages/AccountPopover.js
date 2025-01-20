import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_



export default function AccountPopover() {

  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleProfile = () => {
    navigate('/admin/view');
    setOpen(null);
  }

  const handleLogoutClick = () => {
    if (open) {
      localStorage.clear();
      navigate('/');
      setOpen(null);
    }
  };

 
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem disabled onClick={handleProfile} sx={{ m: 1 }}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          Profile
        </MenuItem>

        {/* <MenuItem onClick={handleChangePassword} sx={{ m: 1 }}>
          <PasswordIcon sx={{ mr: 1 }} />
          Change Password
        </MenuItem> */}
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogoutClick} sx={{ m: 1 }}>
          <LogoutIcon sx={{ mr: 1 }} /> {/* Icon before the text */}
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutAdminButton(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <Typography onClick={() => dispatch({ type: 'LOGOUT_ADMIN' })}>Logout</Typography>
    </div>
  );
}

export default LogOutAdminButton;

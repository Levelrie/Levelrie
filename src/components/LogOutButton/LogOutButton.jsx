import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <div>

      <Typography onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Typography>
    
    {/* <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </button> */}
    </div>
  );
}

export default LogOutButton;

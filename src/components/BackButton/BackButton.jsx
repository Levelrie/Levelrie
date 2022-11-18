import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import Backdrop from '@mui/material/Backdrop';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react'

// import component
import LogOutButton from '../LogOutButton/LogOutButton';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color: theme.palette.baseGrey
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
}));
  


function BackButton () {

    const [hidden, setHidden] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation();
    const history = useHistory();
    const pathname = location.pathname;
    console.log('what is', pathname);


    const handleClick = () => {
        history.go(-1);
    }
    
    return (
        <div>
            <Box>
                <Backdrop open={open} />
                <StyledSpeedDial
                    ariaLabel="SpeedDial playground example"
                    hidden={hidden}
                    icon={<ArrowBackIosNewIcon />}
                    direction={'down'}
                    onClick={handleClick}
                >
                </StyledSpeedDial>
            </Box>   
        </div>
    )
}

export default BackButton;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Backdrop from '@mui/material/Backdrop';

// import component
import LogOutButton from '../LogOutButton/LogOutButton';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));
  
  const actions = [
    { icon: <AccountCircleOutlinedIcon />, name: 'Account' },
    { icon: <SettingsOutlinedIcon />, name: 'Settings' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <LogoutOutlinedIcon />, name: <LogOutButton /> }
  ];
  
  export default function PlaygroundSpeedDial() {
    const [hidden, setHidden] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  
    return (
        <Box>
        <Backdrop open={open} />
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            hidden={hidden}
            icon={<MenuIcon />}
            direction={'down'}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={handleClose}
                tooltipPlacement="right"
              />
            ))}
          </StyledSpeedDial>
        </Box>
    );
  }
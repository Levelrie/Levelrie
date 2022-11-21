import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import { useLocation} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// Import component
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu.jsx';
import BackButton from '../BackButton/BackButton';

function NavStack() {
  const user = useSelector((store) => store.user);
  // Get admin id

  const [backButton, setBackButton] = useState();
  const location = useLocation();

  // This is to render the back button to appear on certain pages.
  // BUG: If users does not click on the back button and navigate to other pages, the back button will still apear 
  // until they navigate to the original page they were in. 
  useEffect(() => {
    switch(location.pathname) {
      case '/closet/occasions':
        setBackButton(true);
        break;
      case '/closet/:name/outfits':
        setBackButton(false);
        break;
      case '/closet/outfits/detailsPage/:id':
        setBackButton(false);
        break;
      case '/closet/categories':
        setBackButton(true);
        break;
      case '/favorites/outfits':
        setBackButton(true);
      break;
      case '/favorites/outfits/:id':
        setBackButton(false);
      break;
      case '/favorites/outfits/:id/:id':
        setBackButton(false);
      break;
      case '/favorites/categories':
        setBackButton(true);
      break;
      case '/favorites/categories/:id':
        setBackButton(false);
      break;
      case '/home':
      setBackButton(true);
      break;
      case '/search':
      setBackButton(true);
      break;
      case '/cartlanding':
      setBackButton(true);
      break;
    }
  }, [location]);

  return (
    <div className="nav">
      <Link to="/home">
        {/* <h2 className="nav-title">Prime Solo Project</h2> */}
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {/* {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
{/* 
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" /> */}

            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="fixed" sx={{boxShadow: 'none'}}>
              {<BackButton />}
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    LEVELRIE
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default NavStack;
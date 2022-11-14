import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

//  MUI Tools
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cssBaseLine } from '@mui/material';
import Paper from '@mui/material/Paper';

//  Component Imports
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AdminPage from '../AdminPage/AdminPage';
import AdminDesign from '../AdminDesign/AdminDesign';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Home from '../Home/Home';
import FavoriteOutfitList from '../FavoriteOutfitList/FavoriteOutfitList';
import CheckoutSelector from '../CheckoutSelectors/CheckoutSelectors.jsx'
import ModifyPayment from '../ModifyPayment/ModifyPayment';
import ModifyShipping from '../ModifyShipping/ModifyShipping';
import CheckoutConfirmation from '../CheckoutConfirmation/CheckoutConfirmation';
import CheckoutLanding from '../CheckoutSelectors/CheckoutLanding';
import FavoriteItemList from '../FavoriteItemList/FavoriteItemList';
import FavoriteItemCategoriesPage from '../FavoriteItemList/FavoriteItemCategoriesPage';
import SearchPage from '../SearchPage/SearchPage';
import ClosetPage from '../ClosetPage/ClosetPage';
import ClosetItemPage from '../ClosetPage/ClosetItemPage';
import BottomBar from "../BottomBar/BottomBar";
import ToggleButton from '../ToggleButton/ToggleButton';
import ClosetDetailsPage from '../ClosetDetailsPage/ClosetDetailsPage';

//  CSS Import
import './App.css';

const { palette } = createTheme();
const { augmentColor } = palette
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
export const themeOptions = createTheme({
  palette: {
    logoPink: createColor('#D62BD9'),
    medPink: createColor('#D76CD9'),
    basePink: createColor('#f1b3f2'),
    palePink: createColor('#f2dcf2'),
    baseTan: createColor('#BFA78A'),
    baseGrey: createColor('#434343'),
    primary: {
      main: '#f1b3f2',
      contrastText: '#d62bd9',
      light: '#f2dcf2',
      dark: '#d76cd9',
    },
    secondary: {
      main: '#f50057',
      dark: '#c0a68c',
    },
    text: {
      hint: '#ffebee',
      disabled: '#ffebee',
      secondary: '#c0a68c',
      primary: '#424242',
    },
    info: {
      main: '#2196f3',
      contrastText: 'rgba(10,10,10,0.87)',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    h6: {
      fontFamily: 'Saira Condensed',
    },
  },
  fontFamily: 'Saira Condensed',
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);


  return (
    <ThemeProvider theme={themeOptions}>
      
      <Router>
        {user.isAdmin ? '' : <Nav /> }
        <div>
          <Switch>
            {/* ---------- ADMIN ROUTES ---------- */}
            {/* Adding an admin login page that will be navigated to by using a 
            direct URL no link on mobile version to seperate staff from client use */}
            <Route exact path="/admin">
              {user.isAdmin ? <Redirect to="/admin/design" /> : (user.id ? <Redirect to="/" /> : <AdminPage /> )}
            </Route>
            {/* Protected route for admin users */}
            <Route exact path="/admin/design" >
              {user.isAdmin ? <AdminDesign /> : <Redirect exact from="/admin/design" to="/admin" /> }
            </Route>


            {/* ---------- USER ROUTES ---------- */}
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/home"
            >
              <Home />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* This route is for the outfits details path. this page does not the the toggle button */}
            <ProtectedRoute
            // logged in shows Closet Outfit details page else shows LoginPage
            exact
            path="/closet/outfits/detailsPage/:id"
            >
            <ClosetDetailsPage />
            </ProtectedRoute>

            <ProtectedRoute path="/favorites">



              <ToggleButton />
              <ProtectedRoute
                // logged in shows FavoriteOutfitList else shows LoginPage
                exact
                path="/favorites/outfits"
              >
                <FavoriteOutfitList />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows FavoriteItemCategoriesPage else shows LoginPage
                exact
                path="/favorites/categories"
              >
                <FavoriteItemCategoriesPage />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows FavoriteItemList else shows LoginPage
                exact
                path="/favorites/items"
              >
                <FavoriteItemList />
              </ProtectedRoute>
            </ProtectedRoute>

            <ProtectedRoute path="/closet">

                <ToggleButton />
                <ProtectedRoute
                  // logged in shows Closet Outfit List else shows LoginPage
                  exact
                  path="/closet/outfits"
                >
                  <ClosetPage />
                </ProtectedRoute>
                
                <ProtectedRoute
                  // logged in shows Closet categories list else shows LoginPage
                  exact
                  path="/closet/categories"
                >
                  <ClosetItemPage />
                </ProtectedRoute>


            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows FavoriteItemList else shows LoginPage
              exact
              path="/search"
            >
              <SearchPage />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows cart else shows LoginPage
              exact
              path="/cartlanding"
            >
              <CheckoutLanding />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows cart else shows LoginPage
              exact
              path="/cart"
            >
              <CheckoutSelector />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows payment else shows LoginPage
              exact
              path="/payment"
            >
              <ModifyPayment />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows shipping else shows LoginPage
              exact
              path="/shipping"
            >
              <ModifyShipping />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows checkout else shows LoginPage
              exact
              path="/checkout"
            >
              <CheckoutConfirmation />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/home" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            
            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
            <Paper sx={{padding: 0, boxShadow: 2, margin: 0, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
            {user.isAdmin ? '' : <BottomBar /> }
            </Paper>
            {/* {user.isAdmin ? '' : <Footer /> } */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

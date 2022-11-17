import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
 import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
 import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
 import Badge from '@mui/material/Badge';


 import { useLocation, useHistory } from 'react-router-dom';
 import { useEffect, useState } from 'react';
 import { useSelector } from 'react-redux';


 export default function BottomBar() {

   let location = useLocation();
   let history = useHistory();

   useEffect(() => {
    switch(location.pathname) {
      case '/home':
        setValue('swipe');
        break;
      case `/favorites/outfits`:
        setValue('Favorites');
        break;
      case `/cart`:
        setValue('Cart');
        break;  
      case `/closet/outfits`:
        setValue('Closet');
        break;    
      case `/search`:
        setValue('Search');
        break;

    }

  }, [location]);


   const [value, setValue] = React.useState('recents');
   const cart = useSelector(store => store.cart)
   var cartCount = 0

   const handleChange = (event, newValue) => {
     setValue(newValue);

     switch(newValue) {
      case 'swipe':
        history.push('/home');
        break;
      case 'Favorites':
        history.push('/favorites/outfitoccasions');
        break;
      case 'Cart':
        history.push('/cartlanding');
        break;
      case 'Search':
        history.push('/search');
        break;
      case 'Closet':
        history.push('/closet/outfits');
        break;
    }
     console.log(newValue);
     console.log(location);
   };

   cart ?  cartCount = cart.length : cartCount = 0

   return (
    <BottomNavigation  sx={{ width: 1, paddingBottom: 1, paddingTop: 1, zIndex: 100000000 }} value={value} onChange={handleChange}>
         <BottomNavigationAction
        label="Closet"
        value="Closet"
         
        icon={<CheckroomOutlinedIcon htmlColor='#424242'  sx={{ border: 3, borderColor: '#f1b3f2', borderRadius: 50, padding: .5 }} />}
        />
        <BottomNavigationAction
        label="Search"
        value="Search"
        icon={<SearchOutlinedIcon htmlColor='#424242' sx={{ border: 3, borderRadius: 50, borderColor: '#f1b3f2', padding: .5 }}/>}
        />
        <BottomNavigationAction
        label="swipe"
        value="swipe"
        icon={<DoubleArrowIcon htmlColor='#424242' sx={{ border: 3, borderRadius: 50, borderColor: '#f1b3f2', padding: .5 }}/>}
        />
        <BottomNavigationAction
        label="Cart"
        value="Cart"
        icon={<Badge badgeContent={cartCount} color={'primary'}><ShoppingCartOutlinedIcon htmlColor='#424242' sx={{ border: 3, borderRadius: 50, borderColor: '#f1b3f2', padding: .5 }}/></Badge>}
        />
        <BottomNavigationAction
        label="Favorites"
        value="Favorites"
        icon={<FavoriteBorderOutlinedIcon htmlColor='#424242' sx={{ border: 3, borderRadius: 50, borderColor: '#f1b3f2', padding: .5 }}/>}
      />
    </BottomNavigation>
  );
}
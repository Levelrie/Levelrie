import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


export default function BottomBar() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation  sx={{ width: 1 }} value={value} onChange={handleChange}>
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
        icon={<ShoppingCartOutlinedIcon htmlColor='#424242' sx={{ border: 3, borderRadius: 50, borderColor: '#f1b3f2', padding: .5 }}/>}
        />
        <BottomNavigationAction
        label="Favorites"
        value="Favorites"
        icon={<FavoriteBorderOutlinedIcon htmlColor='#424242' sx={{ border: 3, borderRadius: 50, borderColor: '#f1b3f2', padding: .5 }}/>}
      />
    </BottomNavigation>
  );
}
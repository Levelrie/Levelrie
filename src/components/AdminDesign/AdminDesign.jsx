import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';

//  CSS
import './AdminDesign.css';

//  Component Import
import LogOutAdminButton from '../LogOutAdminButton/LogOutAdminButton';
import AdminDesignSlider from '../AdminDesignSlider/AdminDesignSlider';
import OutfitDesignBuilder from '../OutfitDesignBuilder/OutfitDesignBuilder';
import OutfitDesignDetails from '../OutfitDesignDetails/OutfitDesignDetails';
import ItemDesignBuilder from '../ItemDesignBuilder/ItemDesignBuilder';
import ItemDesignDetails from '../ItemDesignDetails/ItemDesignDetails';
import Logout from '@mui/icons-material/Logout';

function AdminDesign() {

  const dispatch = useDispatch();
  const categories = useSelector((store) => store.categories);
  const user = useSelector((store) => store.user);

  const [outfitDesign, setOutfitDesign] = useState(true);
  
  useEffect(() => {
    dispatch ({
      type: 'SAGA_FETCH_CATEGORIES'
    })
    return () => {
      dispatch ({
        type: 'CLEAR_CATEGORY_NAMES'
      })
    }
  }, [user.isAdmin])

  const handleLogout = () => {
    dispatch ({
      type: 'LOGOUT'
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Chip icon={<LogoutIcon />} 
        color='default' 
        label="Logout" 
        variant="contained"
        onClick={handleLogout}
        position='absolute'
        padding='10'
      />
      <Grid container spacing={0.1}>
        <Grid item xs={5}>
          <Box sx={{ height: '95vh', margin: 1, py: 0, backgroundColor: "white"}}>
            <Stack direction="column" spacing={2} display='flex'>
              <Stack direction="row" justifyContent="center">
                <Button variant="contained"
                  size="small"
                  onClick={(event) => {setOutfitDesign(true)}}
                  sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} 
                  color={outfitDesign ? 'primary' : 'baseTan' } 
                  className={outfitDesign ? 'frontButton' : ''}
                >
                  Outfits
                </Button>
                <Button variant="contained" 
                  size="small"
                  onClick={(event) => {setOutfitDesign(false)}}
                  sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} 
                  color={outfitDesign ? 'baseTan' : 'primary' }
                  className={outfitDesign ? '' : 'frontButton'}
                >
                  Items
                </Button>
              </Stack>
              {outfitDesign ? <OutfitDesignBuilder /> : <ItemDesignBuilder />}
              {outfitDesign ? <OutfitDesignDetails /> : <ItemDesignDetails />}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ height: '95vh', margin: 1, py: 0, backgroundColor: 'white'}}>
          {categories.map(category => (
            <Box sx={{margin: 1, py: 0, px: 4, backgroundColor: "#BFA78A", borderRadius: 2, display: 'flex', flexDirection: 'column' }} key={category.id}>
              <AdminDesignSlider category={category} />
            </Box>
          ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDesign;
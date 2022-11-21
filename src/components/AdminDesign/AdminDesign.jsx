import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

//  CSS
import './AdminDesign.css';

//  Component Import
import AdminDesignSlider from '../AdminDesignSlider/AdminDesignSlider';
import OutfitDesignBuilder from '../OutfitDesignBuilder/OutfitDesignBuilder';
import OutfitDesignDetails from '../OutfitDesignDetails/OutfitDesignDetails';
import EditOutfitDesignDetails from '../OutfitDesignDetails/EditOutfitDesignDetails';

function AdminDesign() {

  const dispatch = useDispatch();

  //  Local state
  const [addOutfit, setAddOutfit] = useState(true);
  
  //  Reducer store data
  const categories = useSelector((store) => store.categories);
  const user = useSelector((store) => store.user);
  
  //  Get all the categories
  useEffect(() => {
    dispatch ({
      type: 'SAGA_FETCH_CATEGORIES'
    })
    dispatch ({
      type: 'SAGA_FETCH_OCCASIONS'
    })
    return () => {
      dispatch ({
        type: 'CLEAR_CATEGORY_NAMES'
      })
    }
  }, [user.isAdmin])

  //  Function to logout current user
  const handleLogout = () => {
    dispatch ({
      type: 'LOGOUT'
    })
  }

  //  Set to Create - Clears Outfits
  const clearOutfits = (event) => {
    event.preventDefault();
    setAddOutfit(true);
    dispatch ({
      type: 'CLEAR_OUTFITS'
    })
  }

  //  Set to Edit - Fetchs Outfits
  const fetchOutfits = (event) => {
    event.preventDefault();
    setAddOutfit(false);
    dispatch ({
      type: 'SAGA_FETCH_OUTFITS'
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Fab
        color="primary"
        onClick={handleLogout}
        size="small"
        position="absolute"
        sx={{left: 10, top: 40}}
      >
        <Tooltip title="Logout">
          <LogoutIcon />
        </Tooltip>
      </Fab>
      <Grid container spacing={0.1}>
        <Grid item xs={5}>
          <Box sx={{ height: '95vh', margin: 1, py: 0, backgroundColor: "white"}}>
            <Stack direction="column" spacing={2} display='flex'>
              <Stack direction="row" justifyContent="center">
                {/* Create Outfit Display and Details */}
                <Button variant="contained"
                  size="small"
                  onClick={clearOutfits} 
                  color={addOutfit ? 'primary' : 'baseTan' }
                  sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}}
                  className={addOutfit ? 'frontButton' : ''}
                >
                  Create
                </Button>
                {/* Edit Outfit Display and Details */}
                <Button variant="contained"
                  size="small"
                  onClick={fetchOutfits} 
                  color={addOutfit ? 'baseTan' : 'primary' }
                  sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}}
                  className={addOutfit ? '' : 'frontButton'}
                >
                  Edit
                </Button>
              </Stack>
              <OutfitDesignBuilder />
              {addOutfit ? <OutfitDesignDetails /> : <EditOutfitDesignDetails /> }
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ height: '95vh', margin: 1, py: 0, backgroundColor: 'white'}}>
          {categories.map(category => (
            <Box sx={{margin: 1, 
              py: 0, 
              px: 4, 
              backgroundColor: "#BFA78A", 
              borderRadius: 2, 
              display: 'flex', 
              flexDirection: 'column' }} 
              key={category.id}
            >
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
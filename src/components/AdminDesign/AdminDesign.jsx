import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

//  Component Import
import LogOutAdminButton from '../LogOutAdminButton/LogOutAdminButton';
import AdminDesignSlider from '../AdminDesignSlider/AdminDesignSlider';
import AdminDesignBuilder from '../AdminDesignBuilder/AdminDesignBuilder';
import { autocompleteClasses } from '@mui/material';

function AdminDesign() {

  const dispatch = useDispatch();
  const categories = useSelector((store) => store.categories);
  const user = useSelector((store) => store.user);

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

  //  TO BE REMOVED LATER
  const testClicker = () => {
    console.log('is admin?', user.isAdmin);
    console.log('categories?', categories);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.1}>
        <Grid item xs={5}>
          <Card sx={{ height: '90vh', margin: 2, backgroundColor: "pink"}}>
            <Button onClick={testClicker}>
              CLICKER
              {/* <LogOutAdminButton /> */}
            </Button>
          <AdminDesignBuilder />
          </Card>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ height: '95vh', margin: 1, py: 0}}>
          {categories.map(category => (
            <Box sx={{margin: 1, py: 0, px: 4, backgroundColor: "tan", display: 'flex', flexDirection: 'column' }} key={category.id}>
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
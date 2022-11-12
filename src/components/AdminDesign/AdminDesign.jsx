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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '95vh',
    margin: 5,
    marginTop: 15,
    color: theme.palette.text.secondary,
  }));

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
          <Card sx={{ height: '90vh', margin: 2, backgroundColor: "tan"}}>
          {categories.map(category => (
            <CardContent key={category.name}>
              <AdminDesignSlider category={category.name} />
            </CardContent>
          ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDesign;
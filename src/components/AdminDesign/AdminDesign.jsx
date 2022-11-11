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
  const category = useSelector((store) => store.category);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch ({
      type: 'FETCH_CATEGORY'
    })
    return () => {
      dispatch ({
        type: 'CLEAR_CATEGORY'
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
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0.1}>
        <Grid item xs={5} backgroundColor='blue'>
          <Item >
            <Button onClick={testClicker}>
              CLICKER
              {/* <LogOutAdminButton /> */}
            </Button>
          <AdminDesignBuilder />
          </Item>
        </Grid>
        <Grid item xs={7} backgroundColor='blue'>
          <AdminDesignSlider />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDesign;
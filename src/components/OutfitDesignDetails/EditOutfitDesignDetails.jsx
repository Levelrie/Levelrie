import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';  
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditOutfitDesignDetails() {

  const dispatch = useDispatch();

  //  Local state
  const [occasionPick, setOccasionPick] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);

  //  Reducer store data
  const user = useSelector((store) => store.user);
  const outerwear = useSelector((store) => store.outerwear);
  const top = useSelector((store) => store.top);
  const accessory = useSelector((store) => store.accessory);
  const bottom = useSelector((store) => store.bottom);
  const footwear = useSelector((store) => store.footwear);
  const occasions = useSelector((store) => store.occasions);
  // const outfit = useSelector((store) => store.outfit);

  //  Launches Dialog Pop-Up
  const handleSubmitCheck = () => {
    setOpen(true);
  }

  //  Closes Dialog Pop-Up
  const handleClose = () => {
    setOpen(false);
  };

  //  Adds Outfit to Database
  const createOutfit = (event) => {
    event.preventDefault();
    setOpen(false);
    dispatch ({
      type: 'SAGA_CREATE_OUTFIT',
      payload: {
        name: name,
        description: description,
        occasion: occasionPick,
        item_ids: [outerwear.id, top.id, accessory.id, bottom.id, footwear.id]
      }
    })
    setName('');
    setOccasionPick('');
    setDescription('');
  }

  return (
    <Box sx={{ height: 'auto', 
      margin: 1, 
      padding: 1, 
      mb: 0, 
      backgroundColor: "rgb(242, 220, 242, .5)", 
      border: 'solid 2px',
      borderRadius: 4, 
      borderColor: '#434343'
    }}>
      <Stack direction="row" spacing={1} display='flex'>
        <Card sx={{borderRadius: 4, width: '50%'}}>
          <Stack direction="column" spacing={2} display='flex'>
            <TextField
              size='small'
              variant="outlined"
              id="outlined-read-only-input"
              label="Outerwear:"
              value={outerwear.name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              size='small'
              variant="outlined"
              id="outlined-read-only-input"
              label="Top:"
              value={top.name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              size='small'
              variant="outlined"
              id="outlined-read-only-input"
              label="Accessory:"
              value={accessory.name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              size='small'
              variant="outlined"
              id="outlined-read-only-input"
              label="Bottom:"
              value={bottom.name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              size='small'
              variant="outlined"
              id="outlined-read-only-input"
              label="Footwear:"
              value={footwear.name || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
        </Card>
        <Card sx={{borderRadius: 4, width: '50%'}}>
          <Stack direction="column" spacing={2} display='flex'>
            <TextField
              required
              size='small'
              variant="outlined"
              id="outlined-read-only-input"
              label="Outfit Name:"
              placeholder='Name goes here'
              value={name}
              onChange={(event) => { setName(event.target.value); }}
              InputProps={{
                readOnly: false,
              }}
            />
            <FormControl required fullWidth size="small" >
              <InputLabel id="demo-select-small" >Outfit Occasion</InputLabel>
              <Select
                required
                labelid="demo-select-small"
                id="demo-simple-small"
                label="Outfit Occasion"
                value={occasionPick}
                onChange={(event) => { setOccasionPick(event.target.value); }}
              >
                <MenuItem value="">
                  <em>Select an occasion</em>
                </MenuItem>
                {occasions.map(occasion => (
                  <MenuItem key={occasion.id} value={occasion.id}>
                    {occasion.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size='small'
              variant="outlined"
              id="outlined-read-only-input"
              label="Outfit Description:"
              placeholder='Description goes here'
              multiline
              rows={4}
              value={description}
              onChange={(event) => { setDescription(event.target.value); }}
              InputProps={{
                readOnly: false,
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" onClick={handleSubmitCheck}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleSubmitCheck}>
                Delete
              </Button>
            </Stack>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
{/* ------------------------------------------------------------------------------------ */}
              <DialogTitle id="alert-dialog-title">
                Outfit Design by {user.username}:  {name}
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">
                  CONFIRM - Add outfit design to database
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  CANCEL - Explore alternative outfit designs
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={createOutfit} autoFocus>
                  Confirm
                </Button>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
{/* ------------------------------------------------------------------------------------ */}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default EditOutfitDesignDetails;


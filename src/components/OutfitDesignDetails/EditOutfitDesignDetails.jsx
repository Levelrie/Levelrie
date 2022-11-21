import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
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

  useEffect(() => {
  }, [nameId])

  //  Local state
  const [occasionPick, setOccasionPick] = useState('');
  const [nameId, setNameId] = useState('');
  const [description, setDescription] = useState('');
  const [updateCheck, setUpdateCheck] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [outfit, setOutfit] = useState('');

  //  Reducer store data
  const user = useSelector((store) => store.user);
  const outerwear = useSelector((store) => store.outerwear);
  const top = useSelector((store) => store.top);
  const accessory = useSelector((store) => store.accessory);
  const bottom = useSelector((store) => store.bottom);
  const footwear = useSelector((store) => store.footwear);
  const occasions = useSelector((store) => store.occasions);
  const outfits = useSelector((store) => store.outfits.outfits[0]);

   //  Launches Update Pop-Up
  const handleUpdateCheck = () => {
    setUpdateCheck(true);
  }

  //  Closes Update Pop-Up
  const handleUpdateClose = () => {
    setUpdateCheck(false);
  };

  //  Launches Delete Pop-Up
  const handleDeleteCheck = () => {
    setDeleteCheck(true);
  }

  //  Closes Delete Pop-Up
  const handleDeleteClose = () => {
    setDeleteCheck(false);
  };

  //  Update an Outfit in the Database
  const updateOutfit = (event) => {
    event.preventDefault();
    setUpdateCheck(false);
    dispatch ({
      type: 'SAGA_EDIT_OUTFIT',
      payload: {
        id: nameId,
        description: description,
        occasion: occasionPick,
        item_ids: [outerwear.id, top.id, accessory.id, bottom.id, footwear.id]
      }
    })
    setNameId('');
    setOccasionPick('');
    setDescription('');
  }

  //  Delete an Outfit from the Database
  const deleteOutfit = (event) => {
    event.preventDefault();
    setDeleteCheck(false);
    dispatch ({
      type: 'SAGA_DELETE_OUTFIT',
      payload: nameId
    })
    setNameId('');
    setOccasionPick('');
    setDescription('');
  }

  const handleSelection = (nameIdSelected) => {
    console.log('What is this?', nameIdSelected);
    setNameId(nameIdSelected);
    for(let outfit of outfits) {
      if (outfit.id === nameIdSelected) {
        setOccasionPick(outfit.occasion_id);
        setDescription(outfit.description)
      }
    }
    dispatch ({
      type: 'SAGA_FIND_OUTFIT',
      payload: nameIdSelected
    })
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
              value={outerwear?.name || ''}
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
            <FormControl required fullWidth size="small" >
              <InputLabel id="demo-select-small" >Outfit Name</InputLabel>
              <Select
                required
                labelid="demo-select-small"
                id="demo-simple-small"
                label="Outfit Name"
                value={nameId}
                onChange={(event) => handleSelection(event.target.value)}
              >
                <MenuItem value="">
                  <em>Select an outfit name</em>
                </MenuItem>
                {outfits?.map(outfit => (
                  <MenuItem key={outfit.id} value={outfit.id} >
                    {outfit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              <Button variant="contained" onClick={handleUpdateCheck}>
                Update
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteCheck}>
                Delete
              </Button>
            </Stack>
{/* ------------------------------------------------------------------------------------ */}
            <Dialog
              open={updateCheck}
              onClose={handleUpdateClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Apply Changes to Outfit Design?
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">
                  UPDATE - Confirm changes to outfit design in database
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  CANCEL - No changes made to outfit design in database
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={updateOutfit} autoFocus>
                  UPDATE
                </Button>
                <Button variant="outlined" onClick={handleUpdateClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
{/* ------------------------------------------------------------------------------------ */}
            <Dialog
              open={deleteCheck}
              onClose={handleDeleteClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Delete Outfit Design?
              </DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">
                  DELETE - Remove outfit design from database
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  CANCEL - No changes made to outfit design in database
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={deleteOutfit} autoFocus>
                  DELETE
                </Button>
                <Button variant="outlined" onClick={handleDeleteClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default EditOutfitDesignDetails;


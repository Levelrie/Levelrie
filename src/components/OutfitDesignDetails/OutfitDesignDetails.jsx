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

function OutfitDesignDetails() {
  //  TODO
  //    1.  Setup an Outfit Fetch to utilize an Outfit Store
  //    2.  Create a dispatch for Submitting an Outfit Create
  //    3.  Figure out the Edit Outfit stuffzzzz

  const dispatch = useDispatch();

  //  Local state
  // const [addOutfit, setAddOutfit] = useState(true);
  const [occasionPick, setOccasionPick] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //  Reducer store data
  const outerwear = useSelector((store) => store.outerwear);
  const top = useSelector((store) => store.top);
  const accessory = useSelector((store) => store.accessory);
  const bottom = useSelector((store) => store.bottom);
  const footwear = useSelector((store) => store.footwear);
  const occasions = useSelector((store) => store.occasions);
  const outfit = useSelector((store) => store.outfit);

  //  Calculating outfit price starting with strings containing special characters
  //  Set strings to numbers and removing $
  // const outerwearPrice = Number((outerwear.price)?.replace('$','')) || '';
  // const topPrice = Number((top.price)?.replace('$','')) || '';
  // const accessoryPrice = Number((accessory.price)?.replace('$','')) || '';
  // const bottomPrice = Number((bottom.price)?.replace('$','')) || '';
  // const footwearPrice = Number((footwear.price)?.replace('$','')) || '';
  // const totalPrice = outerwearPrice+topPrice+accessoryPrice+bottomPrice+footwearPrice;

  const createOutfit = (event) => {
    event.preventDefault();
    dispatch ({
      type: 'SAGA_CREATE_OUTFIT',
      payload: {
        name: name,
        description: description,
        occasion: occasionPick,
        item_ids: [outerwear.id, top.id, accessory.id, bottom.id, footwear.id]
      }
    })
  }
  // TEST ------- TEST
  const test = () => {
    console.log('Occasions:', occasions);
    console.log('Occasion Pick:', occasionPick);
  }
  // TEST ------- TEST

  return (
    <>
      {/* <Stack direction="row" justifyContent="center">
        
        <Button variant="contained"
          size="small"
          onClick={(event) => {setAddOutfit(true)}} 
          color={addOutfit ? 'primary' : 'baseTan' }
          sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}}
          className={addOutfit ? 'frontButton' : ''}
        >
          Create
        </Button>

        <Button variant="contained"
          size="small"
          onClick={(event) => {setAddOutfit(false)}} 
          color={addOutfit ? 'baseTan' : 'primary' }
          sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}}
          className={addOutfit ? '' : 'frontButton'}
        >
          Edit
        </Button>
      </Stack> */}
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
              {/* <TextField
                size='small'
                variant="outlined"
                id="outlined-read-only-input"
                label="Outfit Price:"
                value={totalPrice || ''}
                InputProps={{
                  readOnly: true,
                }}
              /> */}
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
              <Button variant="contained" onClick={createOutfit}>
                Submit
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Box>
      {/* <button onClick={test}>Test</button> */}
    </>
  );
}

export default OutfitDesignDetails;


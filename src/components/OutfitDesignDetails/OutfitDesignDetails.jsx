import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';  


function OutfitDesignDetails() {

  //  Local store
  const [addOutfit, setAddOutfit] = useState(true);

  //  Reducer store data
  const outerwear = useSelector((store) => store.outerwear);
  const top = useSelector((store) => store.top);
  const accessory = useSelector((store) => store.accessory);
  const bottom = useSelector((store) => store.bottom);
  const footwear = useSelector((store) => store.footwear);

  //  Calculating outfit price starting with strings containing special characters
  //  Set strings to numbers and removing $
  const outerwearPrice = Number((outerwear.price)?.replace('$','')) || '';
  const topPrice = Number((top.price)?.replace('$','')) || '';
  const accessoryPrice = Number((accessory.price)?.replace('$','')) || '';
  const bottomPrice = Number((bottom.price)?.replace('$','')) || '';
  const footwearPrice = Number((footwear.price)?.replace('$','')) || '';
  const totalPrice = outerwearPrice+topPrice+accessoryPrice+bottomPrice+footwearPrice;

  return (
    <>
      <Stack direction="row" justifyContent="center">
        
        <Button variant="contained"
          size="small"
          onClick={(event) => {setAddOutfit(true)}} 
          color={addOutfit ? 'primary' : 'baseTan' }
          sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}}
          className={addOutfit ? 'frontButton' : ''}
        >
          Add
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
      </Stack>
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
              <TextField
                size='small'
                variant="outlined"
                id="outlined-read-only-input"
                label="Outfit Price:"
                value={totalPrice || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
          </Card>
          <Card sx={{borderRadius: 4, width: '50%'}}>
            <Stack direction="column" spacing={2} display='flex'>
              <TextField
                size='small'
                variant="outlined"
                id="outlined-read-only-input"
                label="Outfit Name:"
                placeholder='Name goes here'
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                size='small'
                variant="outlined"
                id="outlined-read-only-input"
                label="Outfit Occasion:"
                placeholder='Occasion goes here'
                multiline
                rows={5}
                InputProps={{
                  readOnly: false,
                }}
              />
              <Button variant="contained">
                Submit
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </>
  );
}

export default OutfitDesignDetails;
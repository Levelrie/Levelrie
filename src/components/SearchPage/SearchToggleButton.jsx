import * as React from 'react';
import '../ToggleButton/ToggleButton.css';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function SearchToggleButton() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_CATEGORIES'
        });
    }, []);
  
    const [isFront, setIsFront] = useState(true);

    const handleClick = (e) => {
        console.log('this', e.target.value);
        setIsFront(current => !current);

        switch(e.target.value) {
            case 'outfit':
                //
            case 'category':
                //
        }

    }

  return (
    <>
        <Stack direction='row' justifyContent='center'>
            <Button variant='contained' value='outfit' color={isFront ? 'basePink' : 'baseTan'} id='outfitButton' className={isFront ? 'frontButton' : ''} sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} onClick={(e) => handleClick(e)}>Outfit</Button>
            <Button variant='contained' value='category' color={!isFront ? 'basePink' : 'baseTan'} id='categoryButton' className={!isFront ? 'frontButton' : ''} sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} onClick={(e) => handleClick(e)}>Category</Button>
        </Stack>
        <FormGroup aria-label="position" row>
            <FormControlLabel
            value="tops"
            control={<Switch color="primary" />}
            label="Tops"
            labelPlacement="top"
            />
            <FormControlLabel
            value="bottoms"
            control={<Switch color="primary" />}
            label="Bottoms"
            labelPlacement="top"
            />

        </FormGroup>
    </>
  );
}
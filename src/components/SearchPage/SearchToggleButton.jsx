import * as React from 'react';
import '../ToggleButton/ToggleButton.css';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function SearchToggleButton({setConstraint, currentCategories, setCategories}) {

    const dispatch = useDispatch();

    const categories = useSelector(store => store.categories);

    useEffect(() => {
        dispatch({
            type: 'SAGA_FETCH_CATEGORIES'
        });
    }, []);
  
    const [isFront, setIsFront] = useState(true);
    const [catsDisabled, setCatsDisabled] = useState(true);

    const handleClick = (e) => {
        console.log('this', e.target.value);

        switch(e.target.value) {
            case 'outfit':
                setCatsDisabled(true);
                setIsFront(true);
                setConstraint('globalOutfits')
                break;
            case 'category':
                setCatsDisabled(false);
                setIsFront(false);
                setConstraint('globalItems')
                break;
        }

    }

    const handleSwitch = (e) => {

        // If this switch is being turned to "on"
        if (e.target.checked) {
            setCategories([...currentCategories, e.target.value]);
        } else if (!e.target.checked) {
            // If this switch is being turned "off"
            // Remove it from the category list
            let filtered = currentCategories.filter(category => category != e.target.value);
            setCategories(filtered);
        }
        console.log(currentCategories);
    }

  return (
    <div className="searchToggle">
        <Stack direction='row' justifyContent='center'>
            <Button variant='contained' value='outfit' color={isFront ? 'basePink' : 'baseTan'} id='outfitButton' className={isFront ? 'frontButton' : ''} sx={{borderRadius: 3 , width: 120, left: 10, fontSize: 16}} onClick={(e) => handleClick(e)}>Outfit</Button>
            <Button variant='contained' value='category' color={!isFront ? 'basePink' : 'baseTan'} id='categoryButton' className={!isFront ? 'frontButton' : ''} sx={{borderRadius: 3, width: 120, right: 10, fontSize: 16}} onClick={(e) => handleClick(e)}>Category</Button>
        </Stack>
        <FormGroup aria-label="position" row>
        {categories.map((category, i) => {
            return (
                <FormControlLabel
                    key={i}
                    value={category.name}
                    control={<Switch color="primary" onChange={(e) => handleSwitch(e)} />}
                    label={category.name}
                    labelPlacement="top"
                    disabled={catsDisabled}
                />
            );
        })}
        </FormGroup>
    </div>
  );
}
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

// item is a prop passed in from component
// example: item = a specific shirt
export default function UnfavoriteOutfitButton({outfitId, occasionId}) {



    const [check, setCheck] = useState(true);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    // when heart is clicked, set check to the opposite of its value
    const handleChange = () => {

        setCheck(false)
        handleFavorite();
    }

  const handleFavorite = () => {
    if(check === true) {
        console.log('dispatch remove from favorites');

        dispatch({
            type: 'SAGA_UNFAVORITE_OUTFIT_FROM_FAVORITES',
            payload: {outfitId: outfitId, occasionId: occasionId}
        });

    handleClose();

  }
}

const handleClickOpen = () => {
    console.log('in handleClickOpen');
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

    return (
        <>
        <Checkbox 
            onChange={handleClickOpen}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            value={check}
            checked={check}
            sx={{
                color: 'pink',
                '&.Mui-checked': {
                  color: 'pink',
                },
            }}
        />    
        <Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogContent>Delete outfit from favorites?</DialogContent>
        <DialogContent>All of the outfit pieces will be removed as well</DialogContent>
        <DialogActions>
            <Button color="warning" value="0" onClick={handleChange}>Delete</Button>
            <Button  variant="contained" onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>  
    </>
    );
};
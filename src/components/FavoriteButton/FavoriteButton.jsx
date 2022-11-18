import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

function FavoriteButton({itemId, outfitId, defaultChecked, changeQty}) {

  const [check, setCheck] = useState(defaultChecked);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // when heart is clicked, set check to the opposite of its value
  const handleChange = () => {
    console.log('in handleChange and check is:', check);
    if(check) {
      console.log('check is true, trying to UNfavorite');
      handleClickOpen();
    }
    else {
      console.log('check is false, trying to favorite');
    }
  }

    const handleClickOpen = () => {
        console.log('in handleClickOpen');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
      console.log('start deleting!');
      // dispatch({
      //   type: 'SAGA_UNFAVORITE_TEST',
      //   payload: {
      //     itemId: itemId,
      //     // outfitId: outfitId
      //   }
      // });

      setCheck(false);
      handleClose();
      // need to refresh page
    }

  const handleFavorite = () => {
    if(check === false) {  // if false (false because check will not have changed yet) then add to favorites
      console.log('dispatch add to favorites');
      dispatch({
        type: 'SAGA_FAVORITE_ITEM',
        payload: {
          itemId: itemId,
          outfitId: outfitId
        }
      });
    }
  }

    return (
      <>
        { }
        <Checkbox 
            checked={check}
            onChange={handleChange}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            value={check}
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
                <DialogContent>Delete item from favorites?</DialogContent>
                <DialogActions>
                    <Button color="warning" value="0" onClick={changeQty}>Delete</Button>
                    <Button  variant="contained" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>    
            </>
    );
};

export default FavoriteButton;
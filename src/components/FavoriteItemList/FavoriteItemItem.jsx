import './FavoriteItemItem.css';
import BuyCheckbox from '../BuyCheckbox/BuyCheckbox';
import React from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { useSelector } from 'react-redux'


// MUI
import Typography from '@mui/material/Typography';

function FavoriteItemItem({item}) {
    var carted = false
    const cart = useSelector(store => store.cart)
    for(let cloth of cart){
        console.log('cloth.id', cloth.id)
        console.log('item.id', item.id)
        if(cloth.id === item.id){
          console.log('cloth?', cloth)
            carted = true
        }
      }
  

    console.log('this is the item:', item);
    return (
        <div className='itemItemContainer'>
            <div className='itemItemImage'>
                <img src={item.img} className='itemItemImagePic' />
            </div>
            <div className='itemItemPrice'>
                <Typography className='priceText' sx={{ fontSize: 16 }}>{item.price}</Typography>
            </div>
            <div className='itemItemName'>
                <Typography sx={{ fontSize: 16 }}>{item.name}</Typography>
            </div>
            <div className='itemItemColorLabel'>
                <Typography className='ddLabel' sx={{ fontSize: 14 }}>Color:</Typography>
            </div>
            <div className='itemItemColorDropDown'>
                <select name="color" className='selectDropDown'>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="yellow">Yellow</option>
                </select>
            </div>
            <div className='itemItemSizeLabel'>
                <Typography className='ddLabel' sx={{ fontSize: 14 }}>Size:</Typography>
            </div>
            <div className='itemItemSizeDropDown'>
                <select name="size" className='selectDropDown'>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
            </div>
            <div className='itemItemQuantityLabel'>
                <Typography className='ddLabel' sx={{ fontSize: 14 }}>Qty:</Typography>
            </div>
            <div className='itemItemQuantityDropDown'>
                <select name="quantity" className='selectDropDown'>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div className='itemItemDelete'>
                {/* <Button onClick={handleClickOpen} variant="text"><HighlightOffIcon color="warning"/></Button> */}
                <FavoriteButton defaultChecked={true}/>
            </div>
            <div className='itemItemBuy'>
                <BuyCheckbox item={item} carted={carted}/>
            </div>
        </div>
    );
};

export default FavoriteItemItem;













// import './FavoriteItemItem.css';
// import DropDown from '../DropDown/DropDown';
// import Grid from '@mui/material/Unstable_Grid2';
// import BuyCheckbox from '../BuyCheckbox/BuyCheckbox';
// import { useSelector, useDispatch } from 'react-redux'
// import React, { useState } from 'react';

// // MUI
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// function FavoriteItemItem({item}) {

//     const dispatch = useDispatch();

//     const handleDelete = () => {
//         console.log('in handleDelete')
//         const itemId = item.id;
//         dispatch({
//             type: 'SAGA__ITEM',
//             payload: itemId
//         })
//     }

//     const [open, setOpen] = useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     console.log('this is the item:', item);
//     return (
//         <div className='itemItemContainer'>
//             <div className='itemItemImage'>
//                 <img src={item.img} className='itemItemImagePic' />
//             </div>
//             <div className='itemItemPrice'>
//                 <Typography className='priceText' sx={{ fontSize: 16 }}>{item.price}</Typography>
//             </div>
//             <div className='itemItemName'>
//                 <Typography sx={{ fontSize: 16 }}>{item.name}</Typography>
//             </div>
//             <div className='itemItemColorLabel'>
//                 <Typography className='ddLabel' sx={{ fontSize: 14 }}>Color:</Typography>
//             </div>
//             <div className='itemItemColorDropDown'>
//                 <select name="color" className='selectDropDown'>
//                     <option value="red">Red</option>
//                     <option value="blue">Blue</option>
//                     <option value="yellow">Yellow</option>
//                 </select>
//             </div>
//             <div className='itemItemSizeLabel'>
//                 <Typography className='ddLabel' sx={{ fontSize: 14 }}>Size:</Typography>
//             </div>
//             <div className='itemItemSizeDropDown'>
//                 <select name="size" className='selectDropDown'>
//                         <option value="small">Small</option>
//                         <option value="medium">Medium</option>
//                         <option value="large">Large</option>
//                     </select>
//             </div>
//             <div className='itemItemQuantityLabel'>
//                 <Typography className='ddLabel' sx={{ fontSize: 14 }}>Qty:</Typography>
//             </div>
//             <div className='itemItemQuantityDropDown'>
//                 <select name="quantity" className='selectDropDown'>
//                     <option value="0">0</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                 </select>
//             </div>
//             <div className='itemItemDelete'>
//                 <Button onClick={handleClickOpen} variant="text"><HighlightOffIcon color="warning"/></Button>
//             </div>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//             >
//                 <DialogContent>Delete item from favorites?</DialogContent>
//                 <DialogActions>
//                     <Button color="warning" onClick={handleDelete}>Delete</Button>
//                     <Button  variant="contained" onClick={handleClose}>Cancel</Button>
//                 </DialogActions>
//             </Dialog>
//             <div className='itemItemBuy'>
//                 <BuyCheckbox />
//             </div>
//         </div>
//     );
// };

// export default FavoriteItemItem;
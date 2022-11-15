import './FavoriteItemItem.css';
import DropDown from '../DropDown/DropDown';
import Grid from '@mui/material/Unstable_Grid2';
import BuyCheckbox from '../BuyCheckbox/BuyCheckbox';

// MUI
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

function FavoriteItemItem({item}) {

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
            <div className='itemItemBuy'>
                <BuyCheckbox />
            </div>
        </div>


        // <div key={item.id} variant="outlined" className="itemGrid">
        //     <Grid container>

               
        //         <Grid item container xs={4}>
        //             <Stack className='this'>             
        //                 <img src={item.img} />
        //                 <Typography>{item.price}</Typography>
        //             </Stack> 
        //         </Grid>

    
        //         <Grid item container xs={6}>
        //             <Stack>
        //                 <Typography variant="body1" gutterBottom>{item.name}</Typography>
        //                 <DropDown />
        //             </Stack>
        //         </Grid>

              
        //         <Grid xs={2}>       
        //             <BuyCheckbox />
        //         </Grid>
        //     </Grid>
        // </div>
    );
};

export default FavoriteItemItem;
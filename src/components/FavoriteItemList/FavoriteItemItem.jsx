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
                <Typography className='priceText'>{item.price}</Typography>
            </div>
            <div className='itemItemName'>
                <Typography>{item.name}</Typography>
            </div>
            <div className='itemItemColorLabel'>
                <Typography variant="captiontext" className='ddLabel'>Color:</Typography>
            </div>
            <div className='itemItemColorDropDown'>
                <select name="color" className='selectDropDown'>
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                    <option value="yellow">yellow</option>
                </select>
            </div>
            <div className='itemItemSizeLabel'>
                <Typography variant="captiontext" className='ddLabel'>Size:</Typography>
            </div>
            <div className='itemItemSizeDropDown'>
                <select name="size" className='selectDropDown'>
                        <option value="s">s</option>
                        <option value="m">m</option>
                        <option value="l">l</option>
                    </select>
            </div>
            <div className='itemItemQuantityLabel'>
                <Typography variant="captiontext" className='ddLabel'>Qty:</Typography>
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
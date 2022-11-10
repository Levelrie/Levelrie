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
        <div key={item.id} variant="outlined" className="itemGrid">
            <Grid container>

                {/* COLUMN 1 */}
                <Grid item container xs={4}>
                    <Stack className='this'>             
                        <img src={item.img} />
                        <Typography>{item.price}</Typography>
                    </Stack> 
                </Grid>

                {/* COLUMN 2 */}
                <Grid item container xs={6}>
                    <Stack>
                        <Typography variant="body1" gutterBottom>{item.name}</Typography>
                        <DropDown />
                    </Stack>
                </Grid>

                {/* COLUMN 3 */}
                <Grid xs={2}>       
                    <BuyCheckbox />
                </Grid>
            </Grid>
        </div>
    );
};

export default FavoriteItemItem;
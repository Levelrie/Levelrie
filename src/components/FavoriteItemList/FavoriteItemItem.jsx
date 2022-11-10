import './FavoriteItemItem.css';
import DropDown from '../DropDown/DropDown';
import Grid from '@mui/material/Unstable_Grid2';
import BuyCheckbox from '../BuyCheckbox/BuyCheckbox';

// MUI
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function FavoriteItemItem({item}) {

    console.log('this is the item:', item);

    return (
        <Paper key={item.id} variant="outlined" className="itemGrid">
            <Grid container spacing={0.5}>
                <Grid item container xs={5}>               
                    <img src={item.img} />
                </Grid>
                <Grid xs={5}>
                    <Typography variant="body1" gutterBottom>{item.name}</Typography> {/* replace this with names of the clothes */}
                    <DropDown />
                </Grid>
                <Grid xs={2}>
                    {/* will find a easier way to bring checkbox postion down, for now this is what we are using. */}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <BuyCheckbox />
                </Grid>
                <Grid xs={5}>
                    <Typography>{item.price}</Typography>
                </Grid> 
            </Grid>
        </Paper>
    );
};

 export default FavoriteItemItem;
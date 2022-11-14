import jacket from './jacket.png';
import DropDown from '../DropDown/DropDown';
import Grid from '@mui/material/Unstable_Grid2';
import BuyCheckbox from '../BuyCheckbox/BuyCheckbox';
import { Typography } from '@mui/material';
import './ItemItem.css';

function ItemItem() {

  
  return (
    <div className="itemGrid">
      <Grid container spacing={0.5}>
        <Grid item container xs={5}>               
          <img src={jacket} />
            {/* replace jacket with pictures */}
        </Grid>
        <Grid xs={5}>
          <Typography variant="body1" gutterBottom>Black Leather Jacket</Typography> {/* replace this with names of the clothes */}
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
            <Typography variant="h6">$220</Typography>
          </Grid> 
      </Grid>
    </div>
  )
}

export default ItemItem;
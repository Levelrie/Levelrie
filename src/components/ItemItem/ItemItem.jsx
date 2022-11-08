import jacket from './jacket.png';
import DropDown from '../DropDown/DropDown';
import Grid from '@mui/material/Unstable_Grid2';
import BuyCheckbox from '../BuyCheckbox/BuyCheckbox';

function ItemItem() {

    return (
        <>
        <Grid container spacing={2}>
          <Grid item container xs={4}>
              <Grid item xs={12}>
                <img src={jacket} />
              </Grid>
              <Grid item xs={12}>
                $220
              </Grid>
          </Grid>
          <Grid item container xs={6}>
            <Grid item xs={12}>
              Black Leather Jacket
            </Grid>
            <Grid item container xs={12}>
              {/* <Grid item xs={6}>
                Color:
              </Grid> */}
              <Grid item xs={12}>
                <DropDown />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <BuyCheckbox />
          </Grid>
        </Grid>
        </>
    )
}

export default ItemItem;
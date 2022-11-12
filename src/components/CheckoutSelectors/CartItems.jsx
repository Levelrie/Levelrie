
import Grid from '@mui/material/Unstable_Grid2';
import './CheckoutSelector.css';


function CartItem({ item }) {
    console.log('item=', item)
    // const item = {
    //     id: 2,
    //     colors: 'Black',
    //     sizes: 'S',
    //     quantity: 1,
    //     price: '299.00'
    // }
  return (
    <div className="itemGrid" >
      <Grid container >
        <Grid xs={4} >
          <Grid container alignItems='center' >
            <Grid xs={9}>
              <img src={item.img} />
            </Grid>
            <Grid xs={3}>
              <ul>
                  <li>Desc: {item.name}</li>
                  <li>Brand: {item.seller}</li>
                  <li>Color: {item.color}</li>
                  <li>Size: {item.size}</li>
                  <li>Quantity: 1</li>
                  <li>Price: {item.price}</li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default CartItem;
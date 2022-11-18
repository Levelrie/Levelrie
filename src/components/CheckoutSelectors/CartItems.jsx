
import Grid from '@mui/material/Unstable_Grid2';
import './CheckoutSelector.css';
import Stack from '@mui/material/Stack'



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
      
        <Stack direction={'row'} spacing={8} justifyItems='center' alignItems='end' justifyContent='center' >
              <img src={item.img} className="cartImg" />
              <ul className="cartList">
                  <li>Desc: {item.name}</li>
                  <li>Brand: {item.seller}</li>
                  <li>Color: {item.color}</li>
                  <li>Size: {item.size}</li>
                  <li>Quantity: 1</li>
                  <li>Price: {item.price}</li>
              </ul>
          </Stack>
  
    
  )
}

export default CartItem;
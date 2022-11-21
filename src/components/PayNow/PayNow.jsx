import './PayNow.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';




export default function PayNow({ total }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const shipping = useSelector(store => store.shipping.favoriteAddyReducer)
    console.log('shipping?', shipping)

    const handleClick = () => {
        dispatch({
            type: 'BUY_CART',
            payload: shipping
        })
        history.push('/checkout')

    }

    return(
        <Stack width={.8} alignContent='center' className='payNow' mt={10}>
            <Stack direction='row' justifyContent='space-around'>
                <Stack spacing={0}>
                    <p className='priceTeam'>Shipping: $19.99</p>
                    <p className='priceTeam'>Total: ${total + 19.99}</p>
                </Stack>
                <Button disabled={total === 0 ? true : false} variant='contained' onClick={handleClick}> Pay Now!</Button>
            </Stack>
            <p>This is the final step, after touching the Pay Now button, the payment will be transacted</p>
        </Stack>
    )
}
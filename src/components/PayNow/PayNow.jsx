import './PayNow.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router-dom'




export default function PayNow({ total }) {
    const history = useHistory()

    return(
        <Stack width={.8} alignContent='center' className='payNow' mt={10}>
            <Stack direction='row' justifyContent='space-around'>
                <Stack spacing={0}>
                    <p className='priceTeam'>Total:</p>
                    <p className='priceTeam'>${total}</p>
                </Stack>
                <Button disabled={total === 0 ? true : false} variant='contained' onClick={() => history.push('/checkout')}> Pay Now!</Button>
            </Stack>
            <p>This is the final step, after touching the Pay Now button, the payment will be transacted</p>
        </Stack>
    )
}
import './PayNow.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'



export default function PayNow() {

    return(
        <Stack width={.8} alignContent='center' mt={10}>
            <Stack direction='row' justifyContent='space-around'>
                <Stack spacing={0}>
                    <p className='priceTeam'>Total:</p>
                    <p className='priceTeam'>$567.89</p>
                </Stack>
                <Button variant='contained' > Pay Now!</Button>
            </Stack>
            <p>This is the final step, after touching Pay Now button, the payment will be transacted</p>
        </Stack>
    )
}
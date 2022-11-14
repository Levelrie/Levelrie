import './ShippingSelector.css'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'





export default function ShippingSelector() {
    const history = useHistory()
    const handleAddressClick = () => {
        console.log('code to go to address selection goes here')
      }

    const shippingClick = () => {
        console.log('You clicked the shipping selector')
        history.push('/shipping')

    } 
    return(
        <>
            <Stack direction='row' justifyContent='space-between' width={.8}>
                <p>Shipping</p>
                <Button color='baseGrey' onClick={handleAddressClick}>Add/Edit</Button>
            </Stack>
            <Stack id="shippingSelector" direction='row' justifyContent='space-between' alignItems='center' >
                <LocalShippingOutlinedIcon />Choose Address<ArrowForwardIosOutlinedIcon onClick={shippingClick}/>
            </Stack>
        </>
    )
}
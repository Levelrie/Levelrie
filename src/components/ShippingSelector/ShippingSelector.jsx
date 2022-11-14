import './ShippingSelector.css'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';




export default function ShippingSelector() {
    const handleAddressClick = () => {
        console.log('code to go to address selection goes here')
      }

    const shippingClick = () => {
        console.log('You clicked the shipping selector')
    } 
    return(
        <>
            <Stack direction='row' justifyContent='space-between' width={.8}>
                <p>Shipping</p>
                <Button color='baseGrey' onClick={handleAddressClick}>Add/Edit</Button>
            </Stack>
            <Stack id="shippingSelector" direction='row' justifyContent='space-between' alignItems='center' >
                <LocalShippingOutlinedIcon/>Choose Address<ArrowForwardIosOutlinedIcon onClick={shippingClick}/>
            </Stack>
        </>
    )
}
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';


export default function PurchaseItems() {
    const history = useHistory()

    return(
        <Button variant='contained' onClick={() => history.push('/cart')} sx={{width:.8}}>Purchase Items</Button>
    )
}
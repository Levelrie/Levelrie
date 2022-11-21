import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function BuyButton({ outfit }) {
    const history = useHistory()
    const dispatch = useDispatch()

    const buyThisFit = () => {
        console.log('outfit buy button', outfit[0].items);
        dispatch({
                type: 'SAGA_ADDCART_OUTFIT',
                payload: outfit[0].items
            })
            .then(
                history.push('/cartlanding')
            )
      }
    

    return(
        <Button variant='contained' onClick={buyThisFit} >Purchase Outfit</Button>
    )
}
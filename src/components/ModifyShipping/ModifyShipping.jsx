import './ModifyShipping.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import ShippingAddress from '../ShippingSelector/ShippingAddress';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';







   // const home = {
    //     name: 'Kyle Jensen',
    //     street_address: '5920 Teakwood Lane North',
    //     city: 'Plymouth',
    //     state: 'MN',
    //     zip: '55442'
    // }



export default function ModifyShipping(){
    const history = useHistory()
    const dispatch = useDispatch()
    const addresses = useSelector(store => store.shipping.shippingReducer)
    const [value, setValue] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const newAddressDefault = {nickname: '', street_address: '', city: '', state: '', zip: '', preferred: true}

    const [newAddress, setNewAddress] = useState(newAddressDefault)
    // 
    const handleSubmit = (event) => {
        event.preventDefault();
        addNewAddress(newAddress)
    }

    function emptyInputs() {
        setNewAddress(newAddressDefault)
        
    }
    const addNewAddress = (address) => {
        console.log(`newAddress in newAddress: ${address}`)
        dispatch({
            type: 'SAGA_ADD_SHIPPING',
            payload: address
        })
            emptyInputs()
            handleClose()
            dispatch({type: 'GET_SHIPPING'})
        
    } 
    
    const handleAddressChange = e => {
        const { name, value } = e.target;
        setNewAddress(newAddress => ({
            ...newAddress,
            [name]: value
        }));
    };

    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
        console.log('value= ', value)
      setValue(event.target.value);
    };

    useEffect(() => {
        dispatch({type: 'GET_SHIPPING'})
        console.log('How many???');
    }, []);

    function favAddy() {
        dispatch({type: 'SET_FAVORITE_ADDY', payload: value})
        history.push('/cart')
    }

    
 
 

    return(
        <Stack>
            <Stack direction='row'>
                <Button onClick={favAddy}>Confirm</Button>
                <Button onClick={handleClickOpen}>Add</Button>
                <Button>Edit</Button>
                <Button>Remove</Button>
            </Stack>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Choose an Address</FormLabel>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                required
                onChange={handleChange}
                

                
                >
                {addresses !==[] && [addresses].map((address) => {
                    return(
                <ShippingAddress address={address} key={address.id} />
                
                )})}
                </RadioGroup>
            </FormControl>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Shipping Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your shipping information
                    </DialogContentText>
                    <TextField 
                        onChange={handleAddressChange}
                        margin="dense"
                        id="name"
                        name="nickname"
                        value={newAddress.nickname}
                        label="Address Nickname"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField 
                        onChange={handleAddressChange}
                        margin="dense"
                        id="name"
                        name="street_address"
                        value={newAddress.street_address}
                        label="Street"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField 
                        onChange={handleAddressChange}
                        margin="dense"
                        id="name"
                        label="City"
                        type="text"
                        name='city'
                        value={newAddress.city}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField 
                        onChange={handleAddressChange}
                        margin="dense"
                        id="name"
                        label="State"
                        name="state"
                        value={newAddress.state}
                        type="text"
                        variant="outlined"
                    />
                    <TextField 
                        onChange={handleAddressChange}
                        margin="dense"
                        id="name"
                        label="Zip"
                        type="text"
                        name="zip"
                        value={newAddress.zip}
                        variant="outlined"
                    />
                </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog> 
        </Stack>
    )
}



// aria-labelledby="demo-controlled-radio-buttons-group"
// name="controlled-radio-buttons-group"
// value={value}
// onChange={handleChange}
// >

        
// })}

// {cart.length && cart.map((item) => {
//     return(
//         <CartItem item={item} key={item.id}/>
// )})}
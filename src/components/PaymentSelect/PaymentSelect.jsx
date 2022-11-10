import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './PaymentSelect.css'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';


export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleAddressClick = () => {
    console.log('code to go to payment add/edit goes here')
  }

  return (
    <FormControl sx={{width: .8}}>
        <Stack direction='row' justifyContent='space-between'>
            <FormLabel id="paymentGroup" >Payment</FormLabel>
            <Button color='baseGrey' onClick={handleAddressClick}>Add/Edit</Button>
        </Stack>
        <RadioGroup
            aria-labelledby="paymentGroup"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            id="paymentContainer"
            sx={{display: 'flex', alignItems: 'flex-start'}}
    >       <Stack direction='row' justifyContent='space-between' width={1}>
            <FormControlLabel 
            value="paypal" 
            control={<Radio sx={{ '&.Mui-checked': {color: 'logoPink'}, ml: 2}}/>} 
            label="PayPal" 
        />
        <img id='payPalIcon' src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" />
        </Stack>
        <Stack direction='row' justifyContent='space-between' width={1}>
            <FormControlLabel 
                value="apple" 
                control={<Radio sx={{ '&.Mui-checked': {color: 'logoPink'}, ml: 2}}/>} 
                label="Apple Pay" 
            />
            <img id='applePayIcon' src="./images/applePay.jpg"/>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}
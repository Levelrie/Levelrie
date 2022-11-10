import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// item is a prop passed in from component
// example:

function DropDown() {
    const item = {
        id: 2,
        colors: ['Red', 'Blue', 'Yellow', 'Purple'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        quantity: [0,1,2,3,4,5]
    }

    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleColorChange = (e) => {
        console.log('in handleColorChange');
        setColor(e.target.value);
    }

    const handleSizeChange = (e) => {
        console.log('in handleSizeChange');
        setSize(e.target.value);
    }

    const handleQuantityChange = (e) => {
        console.log('in handleQuantityChange');
        setQuantity(e.target.value);
    }

    // console.log('here is color now:', color)
    // console.log('here is size now:', size)
    // console.log('here is quantity now:', quantity)

    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel>Color</InputLabel>
                    <Select
                        value={color}
                        label="Color"
                        onChange={handleColorChange}
                    >
                    {item.colors.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel>Size</InputLabel>
                    <Select
                        value={size}
                        label="Size"
                        onChange={handleSizeChange}
                    >
                    {item.sizes.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel>Quantity</InputLabel>
                    <Select
                        value={quantity}
                        label="Quantity"
                        onChange={handleQuantityChange}
                    >
                    {item.quantity.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Box>
        </>
    );
};

export default DropDown;
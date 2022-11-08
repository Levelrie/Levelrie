import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// item is a prop passed in from component
// example:

function DropDown() {
    const item = {
        id: 2,
        colors: ['red', 'blue', 'yellow', 'purple'],
        sizes: ['small', 'large'],
        quantity: 3,
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

    console.log('here is color now:', color)
    console.log('here is size now:', size)
    console.log('here is quantity now:', quantity)
    return (
        <>
        <Select
            size="small"
            value={color}
            onChange={handleColorChange}
        >
            {item.colors.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
        </Select>
        <Select
            size="small"
            value={size}
            onChange={handleSizeChange}
        >
            {item.sizes.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
        </Select>

        <Select
            size="small"
            value={quantity}
            onChange={handleQuantityChange}
        >
            <MenuItem>{item.quantity}</MenuItem>
        </Select>
        </>
    );
};

export default DropDown;
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import NativeSelect from '@mui/material/NativeSelect';
import OutlinedInput from "@mui/material/OutlinedInput";


function DropDown() {
    // item is a prop passed in from component
    // example:
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

        {/* ORIGINAL */}
            {/* <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel>Color</InputLabel>
                    <Select
                        value={color}
                        label="color"
                        onChange={handleColorChange}
                    >
                    {item.colors.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel>size</InputLabel>
                    <Select
                        value={size}
                        label="size"
                        onChange={handleSizeChange}
                    >
                    {item.sizes.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                    <InputLabel>quantity</InputLabel>
                    <Select
                        value={quantity}
                        label="quantity"
                        onChange={handleQuantityChange}
                    >
                    {item.quantity.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Box> */}



             {/* TRYING NATIVE SELECT */}
             {/* TO DO:
             -GET IMAGE TO TAKE UP LESS SPACE
             -DROP DOWNS ARE DIFFERENT WIDTHS BASED ON ITEM TITLES IN THAT SAME COLUMN
             -BUY CHECKBOX MUST COME DOWN ON PAGE
            */}
             <Container>
                <Stack>

                <FormControl fullWidth variant="outlined" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                        Color
                    </InputLabel>
                    <NativeSelect
                        size="small"
                        defaultValue={30}
                        input={<OutlinedInput label="Color" />}
                        inputProps={{
                            name: "color",
                            id: "uncontrolled-native"
                        }}
                    >
                        <option value='red'>Red</option>
                        <option value='blue'>Blue</option>
                        <option value='yellow'>Yellow</option>
                    </NativeSelect>
                </FormControl>
                </Stack>
             </Container>


        </>
    );
};

export default DropDown;
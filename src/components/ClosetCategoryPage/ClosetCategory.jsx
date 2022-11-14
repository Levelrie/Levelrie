import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Stack } from '@mui/system';

function ClosetCategory ({category}) {

    const handleClick = (e) => {
        console.log('id', category.id)
    }
    return (
        <div className='categoryList'>
                <Button 
                    sx={{borderRadius:5, fontSize:20}} 
                    className="categoryButton" 
                    color='palePink' 
                    onClick={handleClick} 
                    variant='contained'
                >
                    {category.name}
                </Button>
        </div>
    )
}

export default ClosetCategory;
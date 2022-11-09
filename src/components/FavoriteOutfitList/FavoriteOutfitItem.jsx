import { useEffect } from 'react';

// MUI
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function FavoriteOutfitItem({outfit}) {

    console.log('this is outfit in item:', {outfit})
    return (
        <Paper key={outfit.id}>
            <Typography>{outfit.name}</Typography>
            <Typography>{outfit.description}</Typography>
        </Paper>
    );
};

export default FavoriteOutfitItem;
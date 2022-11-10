
// MUI
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function FavoriteItemItem({item}) {

    console.log('this is the item:', item);
    
    return (
        <Paper key={item.id}>
            <Typography>{item.name}</Typography>
            <Typography>{item.description}</Typography>
        </Paper>
    );
};

export default FavoriteItemItem;
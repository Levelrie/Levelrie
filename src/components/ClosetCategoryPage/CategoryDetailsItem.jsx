import { Card, CardContent, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function CategoryDetailsItem ({items}) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <img src={items.img} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">{items.name}</Typography>
                            <Typography variant="h6">Color: {items.color}</Typography>
                            <Typography variant="h6">Size: {items.size}</Typography>
                            <Typography variant="h6">Seller: {items.seller}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">{items.price}</Typography>
                        </Grid>
                    </Grid> 
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoryDetailsItem;
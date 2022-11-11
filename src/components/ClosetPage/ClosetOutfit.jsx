
// import component
import './ClosetPage.css';

// import material ui
import { Box, Stack } from "@mui/system";
import { styled } from '@mui/material/styles';
import { Paper, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ClosetOutfitList ({outfit}) {

    // handle the outfit detail click
    const clickOnOutfit = () => {
        console.log('outfit id clicked', outfit.id);
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Item onClick={clickOnOutfit}>
                        <Typography variant="h6">Brand Name: {outfit.name}</Typography>
                        <Typography variant="h6">Outfit Description: {outfit.description}</Typography>
                    </Item>
                </Stack>
            </Box>
            <h6></h6>
            <h6></h6>    
        </div>
    )
} // end of ClosetOutfitList

export default ClosetOutfitList;
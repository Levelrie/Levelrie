// import React
import { useHistory } from 'react-router-dom'
// import component
import './ClosetPage.css';

// import material ui
import { Box, Stack } from "@mui/system";
import { styled } from '@mui/material/styles';
import { Card, CardContent, Paper, Typography } from "@mui/material";

function ClosetOutfitList ({outfit}) {
    // use-history
    const history = useHistory()

    // handle the outfit detail click
    const handleDetailsClick = () => {
        history.push(`/closet/outfits/detailsPage/${outfit.id}`)
        console.log('outfit id clicked', outfit.id);
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Stack   
                    direction="column"
                    spacing={2}
                >
                    <Card onClick={handleDetailsClick} sx={{ minWidth: 275 }}>
                        <Typography variant='h6'>{outfit.name}</Typography>
                        <CardContent>
                            <div className="twoTopContainer">
                                <div id="topOne">
                                    <img className="itemPic" src={outfit.items[0]?.f1.img} />
                                </div>
                                <div id="topTwo">
                                    <img className="itemPic" src={outfit.items[1]?.f1.img} />
                                </div>
                                <div id="bottoms">
                                    <img className="itemPic" src={outfit.items[2]?.f1.img} />
                                </div>
                                <div id="footwear">
                                    <img className="itemPic" src={outfit.items[3]?.f1.img} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </div>
    )
} // end of ClosetOutfitList

export default ClosetOutfitList;
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
        <div className="gridFather">
            <div className="outfitSwipeContainer">
            {outfit.items.map(item => {
                return(
                    <div key={item.f1.id} id={item.f2} onClick={handleDetailsClick}>
                        <img className="itemPic" src={item.f1.img} />
                    </div>
                )
            })
            }
            </div>
        </div>
    )
} // end of ClosetOutfitList

export default ClosetOutfitList;
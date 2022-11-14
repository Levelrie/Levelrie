import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TinderCard from 'react-tinder-card'
import OutfitHomeItem from "../OutfitComponents/OutfitHomeItem";
import './Home.css'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export default function Home() {
    const dispatch = useDispatch();

    const outfitsArray = useSelector(store => store.outfits.outfits);
    const counter = useSelector(store => store.outfits.counter);


    useEffect(() => {
        dispatch({type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'});
    return () => {
        dispatch({type:'CLEAR_HOME_OUTFITS'});
    }
}, []);
const rejectOutfit = (id) => {
    dispatch({
        type: 'SAGA_REJECT_OUTFIT',
        payload: id
    });
}
const favoriteOutfit = (id) => {
    dispatch({
        type: 'SAGA_FAVORITE_OUTFIT',
        payload: id
    });
}
// Fix multiple table entry bug
    const onSwipe = (direction, outfitId) => {
        // Direction is a string

        let id = outfitId;

        if (direction === 'left') {
            rejectOutfit(id);
        } else if (direction === 'right') {
            favoriteOutfit(id);
        }

    };

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

//       const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
//         <Tooltip {...props} classes={{ popper: className }} />
//       ))(({ theme }) => ({
//         [`& .${tooltipClasses.tooltip}`]: {
//           backgroundColor: '#f5f5f9',
//           color: 'rgba(0, 0, 0, 0.87)',
//           maxWidth: 220,
//           fontSize: theme.typography.pxToRem(12),
//           border: '1px solid #dadde9',
//         },
//   }));

    console.log('outfitsArray is:', outfitsArray)
    return (
        <Tooltip title="Swipe LEFT to see a new outfit. Swipe RIGHT to save the outfit to favorites" open={open} onClose={handleClose} onOpen={handleOpen}>
        <div className="swipeCardContainer">
            {outfitsArray.map((outfit) => {
                    return (
                        <TinderCard key={outfit.id}
                                    className="swipeCard"
                                    onSwipe={(direction) => onSwipe(direction, outfit.id)}
                                    preventSwipe={['up', 'down']}
                                    >
                                            <OutfitHomeItem outfit={outfit}/>
                        </TinderCard>
                    );
                })}
        </div>        
        </Tooltip>
    );
}
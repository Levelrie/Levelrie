import { useDispatch } from 'react-redux';

import TinderCard from 'react-tinder-card';
import OutfitHomeItem from "../OutfitComponents/OutfitHomeItem";


export default function HomeOutfitCards({outfitsArray}) {

    const dispatch = useDispatch();

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

    return (
        <>
            {outfitsArray.length > 0 ? outfitsArray.map((outfit) => {
                return (
                    <TinderCard key={outfit.id}
                                className="swipeCard"
                                onSwipe={(direction) => onSwipe(direction, outfit.id)}
                                preventSwipe={['up', 'down']}
                                >
                                    <OutfitHomeItem outfit={outfit}/>
                    </TinderCard>
                );
            }) : <p>'No More Fits :(((('</p>
            }
        </>
    );
}
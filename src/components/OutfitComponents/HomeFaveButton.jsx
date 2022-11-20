import { useDispatch } from "react-redux";
import { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function HomeFaveButton({itemId, outfitId}) {

    const [check, setCheck] = useState(false);
    const [text, setText] = useState('Favorite')


    const dispatch = useDispatch();

    
    const handleFavorite = () => {
        if(check === false) { 
            console.log('dispatch add to favorites');
            setCheck(true);
            setText('Unfavorite');
            dispatch({
                type: 'SAGA_FAVORITE_ITEM',
                payload: {
                    itemId: itemId,
                    outfitId: outfitId
                }
            });
        } else if (check === true) {
            console.log('dispatch remove from favorites');
            setCheck(false)
            setText('Favorite');
            dispatch({
                type: 'SAGA_UNFAVORITE_ITEM',
                payload: {
                    itemId: itemId,
                    outfitId: outfitId
                }
          });
        }
    }

    return (
        // <div className="pressable" onClick={handleFavorite}>

        //     <Checkbox 
        //     className="pressable"
        //     checked={check}
        //     onClick={handleFavorite}
        //     icon={<FavoriteBorder className="pressable" />}
        //     checkedIcon={<Favorite className="pressable" />}
        //     value={check}
        //     sx={{
        //         color: 'pink',
        //         '&.Mui-checked': {
        //           color: 'pink',
        //         },
        //         className: "pressable"
        //     }}
        // />

        // </div>
        // <button className="pressable button" onClick={handleFavorite}>{text}</button>
        <img className={check === false ? "pressable homeHeart faded" : "pressable homeHeart"} onClick={handleFavorite} src="./images/home_heart_button.png" />
    )
}
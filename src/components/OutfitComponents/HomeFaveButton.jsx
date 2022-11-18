import { useDispatch } from "react-redux";
import { useState } from 'react';

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
        <button className="pressable" onClick={handleFavorite}>{text}</button>
    )
}
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import TinderCard from 'react-tinder-card';
import OutfitHomeItem from "../OutfitComponents/OutfitHomeItem";


export default function HomeOutfitCards({outfitsArray, rejectionFits, favoriteFits}) {



    useEffect(() => {

       dispatch({
            type: 'SAGA_FETCH_OUTFITS_FOR_SWIPING'
        });

        dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});
        
            dispatch({
                type: 'SAGA_FAVORITE_OUTFITS',
                payload: favoriteFits
            });

            dispatch({
                type: 'SAGA_REJECT_OUTFITS',
                payload: rejectionFits
            });

            return () => {
                // dispatch({
                //     type: 'SAGA_FAVORITE_OUTFITS',
                //     payload: favoriteFits
                // });
    
                // dispatch({
                //     type: 'SAGA_REJECT_OUTFITS',
                //     payload: rejectionFits
                // });
                dispatch({type:'CLEAR_HOME_OUTFITS'});
            }

    }, []);

    const dispatch = useDispatch();

    const rejectOutfit = (id) => {
        dispatch({
            type: 'SET_OUTFIT_TO_REJECT',
            payload: id
        });
    }
    const favoriteOutfit = (id) => {
        dispatch({
            type: 'SET_OUTFIT_TO_FAVORITE',
            payload: id
        });
    }
    
    
    // Fix multiple table entry bug
    const onSwipe = (direction, outfitId) => {
        // Direction is a string

        console.log(direction, outfitId)
    
        let id = outfitId;
 
        if (direction === 'left') {
            rejectOutfit(id);
        } else if (direction === 'right') {
            favoriteOutfit(id);
        }
    };

    return (
        <>
            { outfitsArray.map((outfit) => {
                return (
                <TinderCard key={outfit.id}
                    className="swipeCard"
                    onSwipe={(direction) => onSwipe(direction, outfit.id)}
                    preventSwipe={['up', 'down']} 
                    >
                        <OutfitHomeItem outfit={outfit} />
                </TinderCard>
                );
            }) }
            {/* <TinderCard key={swipeFit.id}
                        className="swipeCard"
                        onSwipe={(direction) => onSwipe(direction, swipeFit.id)}
                        preventSwipe={['up', 'down']} >
                <div className="outfitSwipeContainer">
                    {swipeFit?.items?.map(item => {
                        return (
                            <div key={item.f1.id} id={item.f2}>
                                <img className="itemPic" src={item.f1.img} />
                            </div>
                            );
                        })}
                </div>
            </TinderCard> */}
        </>
    );
}
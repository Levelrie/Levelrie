import { useDispatch } from "react-redux";
import { useState } from 'react';


import FavoriteButton from "../FavoriteButton/FavoriteButton";  // for stretch goal
import HomeFaveButton from "./HomeFaveButton";
import './OutfitHomeItem.css';

export default function OutfitHomeItem({outfit}) {


    return (
        <>
        {
            outfit ?
                <div className="outfitSwipeContainer">
                    {outfit.items.map(item => {
                        return (
                            <div key={item.f1.id} id={item.f2} >
                                <HomeFaveButton itemId={item.f1.id} outfitId={outfit.id}/>
                                <img className="itemPic pressable" src={item.f1.img} onClick={() => console.log('???MaYbE???', item.f1.id)}/>
                            </div>
                            );
                        })}
                </div>
            :
                <p>No more outfits to swipe</p>
        }
        </>
    );
};
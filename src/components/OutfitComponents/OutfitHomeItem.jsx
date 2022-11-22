import { useDispatch } from "react-redux";
import { useState } from 'react';


import FavoriteButton from "../FavoriteButton/FavoriteButton";  // for stretch goal
import HomeFaveButton from "./HomeFaveButton";
import './OutfitHomeItem.css';
import { IconButton } from "@mui/material"; 

export default function OutfitHomeItem({outfit}) {


    return (
        <>
        {
            outfit ?
            <div className="gridFather">
                <div className="outfitSwipeContainer">
                    {outfit.items.map(item => {
                        return (
                            <div key={item.f1.id} id={item.f2} >
                                <HomeFaveButton className="zIndex" itemId={item.f1.id} outfitId={outfit.id}/>
                                {/* <FavoriteButton /> */}
                                <img className="itemPic" src={item.f1.img} onClick={() => console.log('???MaYbE???', item.f1.id)}/>
                            </div>
                            );
                        })}
                </div>
            </div>
            :
                <p>No more outfits to swipe</p>
        }
        </>
    );
};
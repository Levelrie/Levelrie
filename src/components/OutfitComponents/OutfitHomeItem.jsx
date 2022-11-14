// This component will handle the rendering of each individual outfit
import React, { useEffect, useState } from 'react';
import FavoriteButton from "../FavoriteButton/FavoriteButton";  // for stretch goal
import './OutfitHomeItem.css';

export default function OutfitHomeItem({outfit}) {

    const [topCount, setTopCount] = useState(0);
   
    // Determine what page we're on somehow
        // if we're on home view or favorites view -> each item needs a favorite button

        // Which views are we adding buy?
        // Which views are we displaying color and size?

    // Assuming each outfit comes with an array_agg of all its associated items
    console.log('this is outfit:', outfit);
    return (
        <>
        {/* <div className="twoTopContainer">
            <div id="topOne">
                <img className="itemPic" src={outfit.items[0]?.f1.img} />
            </div>
            <div id="topTwo">
                <img className="itemPic" src={outfit.items[1]?.f1.img} />
            </div>
            <div id="bottom">
                <img className="itemPic" src={outfit.items[2]?.f1.img} />
            </div>
            <div id="footwear">
                <img className="itemPic" src={outfit.items[3]?.f1.img} />
            </div>
        </div> */}

        <div className="twoTopContainer">
            {outfit.items.map(item => {
                return (
                    <div key={item.f1.id} id={item.f2}>
                        <img className="itemPic" src={item.f1.img} />
                    </div>
                    );
                })}
        </div>
        



            {/* original code:
            <p>{outfit.name}</p>
            <p>{outfit.description}</p>
            <p>OutfitHomeItem</p>
            {outfit.items.map((item) => {
            return (
                // need to set each item's position somehow -> use className?
                //      If using class name, need to ensure items are received with category names
                // <img key={item.f1.id} className={item.f2} src={item.f1.img} />
                <p key={item.f1.id}>{item.f1.name} <FavoriteButton itemId={item.f1.id} outfitId={outfit.id}/></p>
                );
            })} */}
        </>
    );
};
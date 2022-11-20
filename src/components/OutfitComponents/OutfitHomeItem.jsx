import FavoriteButton from "../FavoriteButton/FavoriteButton";  // for stretch goal
import './OutfitHomeItem.css';
import { IconButton } from "@mui/material"; 

export default function OutfitHomeItem({outfit}) {

    return (
        <>
        {
            outfit ?
                <div className="outfitSwipeContainer">
                    {outfit.items.map(item => {
                        return (
                            <div key={item.f1.id} id={item.f2} >
                                <img className="itemPic pressable" src={item.f1.img} onClick={() => console.log('???MaYbE???', item.f1.id)}/>
                                <FavoriteButton itemId={item.f1.id} outfitId={outfit.id}  onClick={() => console.log('???MaYbE???', item.f1.id)}/>
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
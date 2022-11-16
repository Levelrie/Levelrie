import FavoriteButton from "../FavoriteButton/FavoriteButton";  // for stretch goal
import './OutfitHomeItem.css';

export default function OutfitHomeItem({outfit}) {

    return (
        <>
        {
            outfit ?
                <div className="outfitSwipeContainer">
                    {outfit.items.map(item => {
                        return (
                            <div key={item.f1.id} id={item.f2}>
                                <img className="itemPic" src={item.f1.img} />
                                {/* <FavoriteButton className="pressable" itemId={item.f1.id} outfitId={outfit.id} /> */}
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
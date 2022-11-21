import { useHistory } from 'react-router-dom';
import './FavoriteOutfitItem.css';
import BuyButton from '../BuyCheckbox/BuyButton';


function FavoriteOutfitItem({outfit, occasionId}) {

    const history = useHistory();

    const handleClick = (itemId) => {
        console.log('in handleClick');
        history.push(`/favorites/outfits/${occasionId}/${outfit.outfit_id}/${itemId}`);
    }

    return (  
        <>
         <div className='faveOutfitContainer'>
            {outfit.items.map(item => {
                return(
                    <div key={item.f1.id} id={item.f2} onClick={() => handleClick(item.f1.id)}>
                        <img className="itemPic" src={item.f1.img} />
                    </div>
                )
            })
            }
         </div>
         <BuyButton outfit={outfit}/>
         </> 
     );
 };

export default FavoriteOutfitItem;
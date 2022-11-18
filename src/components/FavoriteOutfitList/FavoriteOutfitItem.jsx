import { useHistory } from 'react-router-dom';
 import './FavoriteOutfitItem.css';

 function FavoriteOutfitItem({outfit, occasionId}) {

    const history = useHistory();

    const handleClick = () => {
        console.log('in handleClick');
        history.push(`/favorites/outfits/${occasionId}/${outfit.id}`);
    }

    return (   
         <div className='faveOutfitContainer'>
            {outfit.items.map(item => {
                return(
                    <div key={item.f1.id} id={item.f2} onClick={handleClick}>
                        <img className="itemPic" src={item.f1.img} />
                    </div>
                )
            })
            }
         </div>
     );
 };

export default FavoriteOutfitItem;
function SearchFavoriteOutfitItem({outfit}) {

    return (   
         <div className='faveOutfitContainer'>
            {outfit?.items?.map(item => {
                return(
                    <div key={item.f1.id} id={item.f2}>
                        <img className="itemPic" src={item.f1.img} />
                    </div>
                )
            })
            }
         </div>
     );
 };

export default SearchFavoriteOutfitItem;
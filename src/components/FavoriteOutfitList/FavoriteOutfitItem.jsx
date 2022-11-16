import Card from '@mui/material/Card';
 import CardContent from '@mui/material/CardContent';
 import Typography from '@mui/material/Typography';
 import Paper from '@mui/material/Paper';
 import './FavoriteOutfitItem.css';

 function FavoriteOutfitItem({outfit}) {

    console.log('this is outfit.id in item:', outfit.id);
    console.log('these are items:', outfit.items)
    return (
        <>
         <Paper className='outfitSwipeContainer'>
            {outfit.items.map(item => {
                return(
                    <div key={item.f1.id} id={item.f2}>
                        <img className="itemPic" src={item.f1.img} />
                    </div>
                )
            })
            }
         </Paper>
</>

     );
 };

export default FavoriteOutfitItem;
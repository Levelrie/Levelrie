// This component will handle the rendering of each individual outfit

import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './OutfitHomeItem.css';

export default function OutfitHomeItem({outfit}) {

    // Determine what page we're on somehow
        // if we're on home view or favorites view -> each item needs a favorite button

        // Which views are we adding buy?
        // Which views are we displaying color and size?

    // Assuming each outfit comes with an array_agg of all its associated items
    console.log('this is outfit:', outfit);
    return (

          <>
        <div className="twoTopContainer">
            <div id="topOne">
                <img className="itemPic" src={outfit.items[0].f1.img} />
            </div>
            <div id="topTwo">
                <img className="itemPic" src={outfit.items[1].f1.img} />
            </div>
            <div id="bottoms">
                <img className="itemPic" src={outfit.items[2].f1.img} />
            </div>
            <div id="footwear">
                <img className="itemPic" src={outfit.items[3].f1.img} />
            </div>
        </div>






        {/* Below is getting slightly better:

        <Grid container key={outfit.id} spacing={0}>
        {outfit.items.map((item) => {
            // <img key={item.f1.id} className={item.f2} src={item.f1.img} />
            return (
                // need to set each item's position somehow -> use className?
                //      If using class name, need to ensure items are received with category names
                <Grid 
                    item 
                    container 
                    xs={6} 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    sx={{
                        '--Grid-borderWidth': '1px',
                        borderTop: 'var(--Grid-borderWidth) solid',
                        borderLeft: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                        '& > div': {
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                        },
                    }}
                >
                    <img key={item.f1.id} className={item.f2} src={item.f1.img} />          
                 </Grid>
                // <p key={item.f1.id}>{item.f1.name} <FavoriteButton itemId={item.f1.id} outfitId={outfit.id}/></p>
                 );
            })}
        </Grid> */}






            {/* <p>{outfit.name}</p>
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
}
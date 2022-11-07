// This component will handle the rendering of each individual outfit

export default function OutfitHomeItem({outfitsArray, homeCounter}) {

    // Determine what page we're on somehow
        // if we're on home view or favorites view -> each item needs a favorite button

        // Which views are we adding buy?
        // Which views are we displaying color and size?

    // Assuming each outfit comes with an array_agg of all its associated items
    return (
        <>
            <p>{outfitsArray[homeCounter]?.name}</p>
            <p>{outfitsArray[homeCounter]?.description}</p>
            {outfitsArray[homeCounter]?.items.map((item) => {
            return (
                // need to set each item's position somehow -> use className?
                //      If using class name, need to ensure items are received with category names
                // <img key={item.f1.id} className={item.f2} src={item.f1.img} />
                <p key={item.f1.id}>{item.f1.name}</p>
                );
            })}
        </>
    );
}
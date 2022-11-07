// This component is fed an array of outfits for it to map through
//  The exact content of the outfits will be determined by whatever parent component it is called in

import OutfitItem from "./OutfitItem";

export default function OutfitList({outfitsArray}) {

    return (
        <>
            {outfitsArray.map((outfit) => {
                return (
                    <OutfitItem key={outfit.id} outfit={outfit} />
                );
            })}
        </>
    );

}
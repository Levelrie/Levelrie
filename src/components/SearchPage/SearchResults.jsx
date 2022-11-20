import SearchFavoriteButton from "./SearchFavoriteButton";
import SearchFavoriteOutfitItem from "./SearchFavoriteOutfitItem";
import SearchFavoriteItemItem from "./SearchFavoriteItemItem";

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function SearchResults({searchResults, constraint}) {

    return (
        <>
            {constraint === 'globalOutfits' ? 

                <Stack spacing={2}>
                    {searchResults?.map(outfit => (
                        <div className='faveOutfitCard' key={outfit.id}>
                            <p>{outfit.name}</p>
                            <SearchFavoriteOutfitItem key={outfit.outfit_id} outfit={outfit}/>
                            <SearchFavoriteButton id={outfit.id} />
                        </div>
                    ))}
                </Stack>  

        : constraint === 'globalItems' ? 
        <>
            <Stack spacing={2}>
            {searchResults?.map((item, i) => {
            return (
                <div key={i} className="resultsDiv">
                    {/* If the result is an outfit, all outfit items will be rendered */}
                    <SearchFavoriteItemItem key={i} item={item} />
                </div>
            );
        })}
            </Stack>
        </>
        : null
        } 
        </>
    );

}
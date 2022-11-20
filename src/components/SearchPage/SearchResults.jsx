import SearchFavoriteButton from "./SearchFavoriteButton";
import SearchFavoriteOutfitItem from "./SearchFavoriteOutfitItem";

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
            {searchResults?.map((result, i) => {
            return (
                <div key={i} className="resultsDiv">
                    <p>{result.name}</p>
                    {/* If the result is one item, its image will be rendered */}
                    <img className="resultImg" src={result.img} />
                    {/* If the result is an outfit, all outfit items will be rendered */}
                    {result?.items?.map((item, i) => {
                        return (
                            <div key={i}>
                                <img className="resultImg" src={item.f1.img} />
                            </div>
                        );
                    })}

                    <SearchFavoriteButton id={result.id} />
                </div>
            );
        })}
        </>
        : null
        } 
        </>
    );

}
import React from 'react';
import SearchFavoriteButton from './SearchFavoriteButton';

// MUI
import Typography from '@mui/material/Typography';


function SearchFavoriteItemItem({item}) {

    return (
        <div className='searchResultsItemContainer'>
            <div className='searchResultsItemContainerInfo'>
                <p>{item.name}</p>
                <img src={item.img} className='itemResultsPic' />
                <p>{item.color}</p>
                <p>{item.size}</p>
            </div>

            <SearchFavoriteButton id={item.id} />
        </div>
    );
};

export default SearchFavoriteItemItem;
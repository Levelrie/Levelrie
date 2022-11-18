import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// MUI
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

function FavoriteSearchBar({constraint, categoryName}) {   
    
    // constraint is prop passed in by a component
    // example: constraint could be "global" to search entire database
    // example: constraint could be "favorites" to search only favorites
    // example: constraint could be "closet" to search only closet
    // will need to dispatch based on that constraint

    // const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const query = useSelector(store => store.favorites.query);

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        // search triggers on SearchToggleButton click
        switch (constraint) {
            case 'favoriteOutfits':
                dispatch({
                    type: 'SAGA_SEARCH_CLOSET_OUTFITS',
                    payload: query
                });
                break;
            case 'favoriteItems':
                dispatch({
                    type: 'SAGA_SEARCH_CLOSET_ITEMS',
                    payload: {query: query, categories: [categoryName]}
                });
                break;
        }


        dispatch({
            type: 'ADD_FAVORITES_SEARCH_CATEGORY',
            payload: categoryName
        });

        return() => {
            dispatch({
                type: 'REMOVE_FAVORITES_SEARCH_CATEGORY',
                payload: categoryName
            });
        }


    }, [constraint, categoryName])

    // The search will fire off to the database on change
    const handleChange = (e) => {
        // setValue(e.target.value);
        console.log('constraint', constraint);
        dispatch({
            type: 'SET_FAVORITES_SEARCH_QUERY',
            payload: e.target.value
        });

        switch (constraint) {
            case 'favoriteOutfits':
                dispatch({
                    type: 'SAGA_SEARCH_FAVORITE_OUTFITS',
                    payload: e.target.value
                });
                break;
            case 'favoriteItems':
                dispatch({
                    type: 'SAGA_SEARCH_FAVORITE_ITEMS',
                    payload: {query: e.target.value, categories: [categoryName]}
                });
                break;
        }
    }

    // console.log('here is value:', value);
    console.log('here is searchValue:', searchValue);

    return (
        <OutlinedInput 
            sx={{ 
                m: 1,
                p: 0,
                width: '90%', 
                [`& fieldset`]:{ borderRadius: 50} 
            }}
            onChange={handleChange}
            size="small"
            value={query}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        // onClick={handleChange}
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default FavoriteSearchBar;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

function SearchBar({constraint, categories}) {   
    
    // constraint is prop passed in by a component
    // example: constraint could be "global" to search entire database
    // example: constraint could be "favorites" to search only favorites
    // example: constraint could be "closet" to search only closet
    // will need to dispatch based on that constraint

    // const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const query = useSelector(store => store.searchResultsReducer.query);

    const dispatch = useDispatch();

    useEffect(() => {
        // search triggers on SearchToggleButton click
        switch (constraint) {
            case 'globalOutfits':
                console.log('111111');
                dispatch({
                    type: 'SAGA_SEARCH_ALL_OUTFITS',
                    payload: query
                });
                break;
            case 'globalItems':
                console.log('222222');
                dispatch({
                    type: 'SAGA_SEARCH_ALL_ITEMS',
                    payload: {query: query, categories: categories}
                });
                break;
        }

    }, [constraint, categories])

    // The search will fire off to the database on change
    const handleChange = (e) => {
        // setValue(e.target.value);
        console.log('constraint', constraint);
        dispatch({
            type: 'SET_GLOBAL_SEARCH_QUERY',
            payload: e.target.value
        });

        switch (constraint) {
            case 'globalOutfits':
                console.log('111111');
                dispatch({
                    type: 'SAGA_SEARCH_ALL_OUTFITS',
                    payload: e.target.value
                });
                break;
            case 'globalItems':
                console.log('222222');
                dispatch({
                    type: 'SAGA_SEARCH_ALL_ITEMS',
                    payload: {query: e.target.value, categories: categories}
                });
                break;
        }
    }

    // const handleSearch = () => {
    //     console.log('in handleSearch');
    //     setSearchValue(value);
    //     console.log('search query', value)

        // TO DO: dispatch to search based on constraint prop

        // if constraint = global then:
        // dispatch({
        //     type: 'SEARCH_GLOBAL',
        //     payload: searchValue
        // })

          // if constraint = favorites then:
        //   dispatch({
        //     type: 'SEARCH_FAVORITES',
        //     payload: searchValue
        // })

          // if constraint = closet then:
        //   dispatch({
        //     type: 'SEARCH_CLOSET',
        //     payload: searchValue
        // })
        

    // }

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

export default SearchBar;
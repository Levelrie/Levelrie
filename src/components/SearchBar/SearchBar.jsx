import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

function SearchBar(constraint) {   
    
    // constraint is prop passed in by a component
    // example: constraint could be "global" to search entire database
    // example: constraint could be "favorites" to search only favorites
    // example: constraint could be "closet" to search only closet
    // will need to dispatch based on that constraint

    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        console.log('in handleChange');
        setValue(e.target.value);
    }

    const handleSearch = () => {
        console.log('in handleSearch');
        setSearchValue(value);

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
        

    }

    console.log('here is value:', value);
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
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={handleSearch}
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default SearchBar;
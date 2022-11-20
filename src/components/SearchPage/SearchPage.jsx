import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchToggleButton from "./SearchToggleButton";
import SearchResults from "./SearchResults";

import './SearchPage.css';

export default function SearchPage() {

    const dispatch = useDispatch();


    useEffect(()=> {

        dispatch({
            type: 'SAGA_FAVORITE_OUTFITS',
            payload: favoriteFits
        });

        dispatch({
            type: 'SAGA_REJECT_OUTFITS',
            payload: rejectionFits
        });

        dispatch({type: 'CLEAR_OUTFITS_TO_REJECT'});
        dispatch({type: 'CLEAR_OUTFITS_TO_FAVORITE'});

    },[]);

    // const [constraint, setConstraint] = useState('globalOutfits');
    // const [categories, setCategories] = useState([]);

    const constraint = useSelector(store => store.searchResultsReducer.constraint);
    const categories = useSelector(store => store.searchResultsReducer.categories);

    const searchResults = useSelector(store => store.searchResultsReducer.searchResults);

    const rejectionFits = useSelector(store => store.outfits.rejectionFits);
    const favoriteFits = useSelector(store => store.outfits.favoriteFits);

    return (
        <div className="searchPage">
            <SearchToggleButton 
                                // setConstraint={setConstraint}
                                currentCategories={categories}
                                // setCategories={setCategories} 
                                />
            <SearchBar constraint={constraint}
                       categories={categories}/>
            <SearchResults searchResults={searchResults} constraint={constraint} />  
        </div>
    );

}
import { useState } from "react";
import { useSelector } from "react-redux";

import SearchBar from "../SearchBar/SearchBar";
import SearchToggleButton from "./SearchToggleButton";
import SearchResults from "./SearchResults";

import './SearchPage.css';

export default function SearchPage() {

    // const [constraint, setConstraint] = useState('globalOutfits');
    // const [categories, setCategories] = useState([]);

    const constraint = useSelector(store => store.searchResultsReducer.constraint);
    const categories = useSelector(store => store.searchResultsReducer.categories);

    const searchResults = useSelector(store => store.searchResultsReducer.searchResults);

    return (
        <div className="searchPage">
            <SearchToggleButton 
                                // setConstraint={setConstraint}
                                currentCategories={categories}
                                // setCategories={setCategories} 
                                />
            <SearchBar constraint={constraint}
                       categories={categories}/>
            <SearchResults searchResults={searchResults} />  
        </div>
    );

}
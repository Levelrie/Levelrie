import { useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import SearchToggleButton from "./SearchToggleButton";
import SearchResults from "./SearchResults";

import './SearchPage.css';

export default function SearchPage() {

    const [constraint, setConstraint] = useState('globalOutfits');
    const [categories, setCategories] = useState([]);

    return (
        <div className="searchPage">
            <SearchToggleButton setConstraint={setConstraint}
                                currentCategories={categories}
                                setCategories={setCategories} />
            <SearchBar constraint={constraint}
                       categories={categories}/>
            <SearchResults />  
        </div>
    );

}
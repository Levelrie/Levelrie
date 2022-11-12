import SearchBar from "../SearchBar/SearchBar";
import SearchToggleButton from "./SearchToggleButton";

import './SearchPage.css';

export default function SearchPage() {

    return (
        <div className="searchPage">
            <SearchToggleButton />
            <SearchBar />
        </div>
    );

}
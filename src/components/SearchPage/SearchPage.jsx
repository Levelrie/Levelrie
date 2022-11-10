import SearchBar from "../SearchBar/SearchBar";
import BottomBar from "../BottomBar/BottomBar";

import Paper from '@mui/material/Paper';

import './SearchPage.css';

export default function SearchPage() {

    return (
        <div className="searchPage">
            <SearchBar />
            <Paper sx={{padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
                <BottomBar />
            </Paper>
        </div>
    );

}
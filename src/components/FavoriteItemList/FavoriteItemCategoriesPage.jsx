import CategoryButtons from "../CategoryButtons/CategoryButtons";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import BottomBar from "../BottomBar/BottomBar";

function FavoriteItemCategoriesPage() {

    return (
        <>
        <Typography variant="h6">Faves</Typography>
        
        {/* need to set functionality for category buttons */}
        <CategoryButtons />
        <Paper sx={{padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000000000, backgroundColor: "transparent" }} elevation={0}>
                <BottomBar />
         </Paper>
        </>
    );
};

export default FavoriteItemCategoriesPage;
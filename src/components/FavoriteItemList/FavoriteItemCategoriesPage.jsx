import CategoryButtons from "../CategoryButtons/CategoryButtons";
import Typography from '@mui/material/Typography';

function FavoriteItemCategoriesPage() {

    return (
        <>
        <Typography variant="h6">Faves</Typography>
        
        {/* need to set functionality for category buttons */}
        <CategoryButtons />
        </>
    );
};

export default FavoriteItemCategoriesPage;
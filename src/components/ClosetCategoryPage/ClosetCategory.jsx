// import React
import { useHistory } from 'react-router-dom'

// import material ui
import Button from '@mui/material/Button';

function ClosetCategory ({category}) {

    // use-history
    const history = useHistory()

    // handle the outfit detail click
    const handleDetailsClick = () => {
        history.push(`/closet/categories/${category.name}`)
        console.log('outfit clicked', 'id', category.id, 'category', category.name);
    }

    return (
        <div className='categoryList'>
                <Button 
                    sx={{borderRadius:5, fontSize:20}} 
                    className="categoryButton" 
                    color='palePink' 
                    onClick={handleDetailsClick} 
                    variant='contained'
                >
                    {category.name}
                </Button>
        </div>
    )
}

export default ClosetCategory;
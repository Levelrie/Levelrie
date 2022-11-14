import React from 'react';

//  MUI Tools
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';


function AdminDesignSliderItem({item}) {

  //  Temporary onClick function to console.log item details
  const addItemToDisplay = () => {
    console.log('Item details:', item);
    dispatch ({
      type: 'SAGA_OUTFIT_DISPLAY',
      payload: item
    })
  }

  return (
    <Card onClick={addItemToDisplay} sx={{ height: '14.4vh', margin: 1, padding: 1, backgroundColor: "#F1B3F2", }}>
      <CardMedia
        sx={{ objectFit: 'contain', maxHeight: '12vh', margin: 'auto'}}
        className="itemSliderImg"
        component="img"
        image={item.img}
        alt={item.name}
      />
    </Card>
  );
}

export default AdminDesignSliderItem;


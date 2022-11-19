import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  MUI Tools
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function OutfitDesignBuilder() {

  const dispatch = useDispatch();

  //  Reducer store data
  const outerwear = useSelector((store) => store.outerwear);
  const top = useSelector((store) => store.top);
  const accessory = useSelector((store) => store.accessory);
  const bottom = useSelector((store) => store.bottom);
  const footwear = useSelector((store) => store.footwear);

  //  Clears out the outfit display
  const clearOutfit = () => {
    dispatch ({type: 'SAGA_CLEAR_OUTFIT'});
  }

  return (
    //  Card grid to manipulate position of clothing items for outfit build
    <Box sx={{ height: '45vh',
      width: '35vw',
      alignSelf: 'center',
      margin: 1,
      padding: 1, 
      // backgroundColor: "rgb(242, 220, 242, .5)",
      backgroundColor: "rgb(67, 67, 67, .4)", 
      border: 'solid 2px',
      borderRadius: 4, 
      borderColor: '#434343',
      display: 'grid', 
      gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', 
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
    }}>
      {/* Outerwear display empty until item clicked */}
      {outerwear ? <CardMedia
        sx={{ objectFit: 'contain', 
          maxHeight: '20vh', 
          maxWidth: '20vh', 
          zIndex: '1', 
          gridColumn: '2/span3', 
          gridRow: '2/span4'
        }}
        className="outerwear"
        component="img"
        image={outerwear.img}
        alt={outerwear.name}
      /> : '' }
      {/* Top display empty until item clicked */}
      {top ? <CardMedia
        sx={{ objectFit: 'contain', 
          maxHeight: '16vh', 
          maxWidth: '20vh', 
          zIndex: '2', 
          gridColumn: '5/span3', 
          gridRow: '4/span4'
        }}
        className="top"
        component="img"
        image={top.img}
        alt={top.name}
      /> : '' }
      {/* Accessory display empty until item clicked */}  
      {accessory ? <CardMedia
        sx={{ objectFit: 'contain', 
          maxHeight: '10vh', 
          maxWidth: '10vw', 
          zIndex: '4', 
          gridColumn: '8/span1', 
          gridRow: '3/span2'
        }}
        className="accessory"
        component="img"
        image={accessory.img} 
        alt={accessory.name}
      /> : '' }
      {/* Bottom display empty until item clicked */}
      {bottom ? <CardMedia
        sx={{ objectFit: 'contain', 
          maxHeight: '25vh', 
          maxWidth: '10vw', 
          zIndex: '3', 
          gridColumn: '8/span3', 
          gridRow: '6/span4'
        }}
        className="bottom"
        component="img"
        image={bottom.img}
        alt={bottom.name}
      /> : '' }
      {/* Footwear display empty until item clicked */}
      {footwear ? <CardMedia
        sx={{ objectFit: 'contain', 
          maxHeight: '15vh', 
          maxWidth: '10vh', 
          zIndex: '5', 
          gridColumn: '3/span1', 
          gridRow: '8/span2'
        }}
        className="footwear"
        component="img"
        image={footwear.img}
        alt={footwear.name}
      /> : '' }
      {/* Button to clear outfit display */}
      <IconButton 
        size="small"
        position="absolute"
        sx={{left: 0, top: 0}} 
        aria-label="delete"
      >
        <Tooltip title="Clear Outfit">
          <DeleteIcon onClick={clearOutfit}/>
        </Tooltip>
      </IconButton>
    </Box>
  );
}

export default OutfitDesignBuilder;

import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';

//  Component
import AdminDesignSliderItem from './AdminDesignSliderItem';

//  Slick 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//  CSS
import './AdminDesignSlider.css';

function AdminDesignSlider({category}) {

  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);

  //  Get all them items
  useEffect(() => {
    dispatch ({
      type: 'SAGA_FETCH_ITEMS'
    })
    return () => {
      dispatch ({
        type: 'CLEAR_ITEMS'
      })
    }
  }, [])

  //  Creates a new array of items based on category passed in
  //  Allows the DOM to be populated with a completed row of each category items
  const itemArray = [];
  {items.map(item => (item.category_id === category.id ? itemArray.push(item) : ''))}
  console.log('Items in category:', category.name, 'Equal:', itemArray);

  //  🟥 🟥 Remove the above code, in the map below, instead use a .filter then a .map ****

  //  Slider Settings
  const settings = {
    dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      // adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  //  Return maps through each category passed in
  return (
    <Slider {...settings} >
      {itemArray.map(item => (
        <span key={item.id}>
          <AdminDesignSliderItem item={item} /> 
        </span>
    ))}
    </Slider>
  );
}

export default AdminDesignSlider;


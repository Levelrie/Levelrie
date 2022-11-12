import React, { useEffect, Component }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//  Component
import AdminDesignSliderItem from './AdminDesignSliderItem';

//  Slick 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//  MUI Tools
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function AdminDesignSlider({category}) {

  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);

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

  const itemArray = [];
  {items.map(item => (item.category_id === category.id ? itemArray.push(item) : ''))}
  console.log('Items in category:', category.name, 'Equal:', itemArray);
  const catName = category.name;

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

  const clicky = () => {
    console.log('items', items);
  }

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


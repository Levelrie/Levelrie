const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to fetch all closet items
router.get('/category/:name', rejectUnauthenticated, (req, res) => {

    // This route will also be used as the closetItem search route
    let searchQuery = req.query.q;
    // If no query is passed through, it will fetch all outfits normally
    searchQuery += '%';

  // console.log('what is', req.params.name);
  // we only want the closet items that is related to a specific user purchases. 
  const sqlQuery = `
    SELECT 
      closet_items.id,
      closet_items.user_id,
      items.name,
      items.color,
      items.size,
      items.seller,
      items.price,
      items.img,
      categories.name AS category
    FROM closet_items
    JOIN "items" ON closet_items.item_id = items.id
    JOIN "categories" ON items.category_id = categories.id
    WHERE closet_items.user_id = $1 AND categories.name = $2 AND UPPER(items.name) LIKE UPPER($3);
  `;

  const sqlValues = [req.user.id, req.params.name, searchQuery]

  pool.query(sqlQuery, sqlValues)
    .then( result => {
      // console.log('what is', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('dbErr in /api/closet/items:', err);
      res.sendStatus(500)
    })
});

// GET route to fetch category table 
router.get('/category', rejectUnauthenticated, (req, res) => {

const sqlQuery = `SELECT * FROM categories;`;

  pool.query(sqlQuery)
    .then( result => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('dbErr in /api/closet/oufits:', err);
      res.sendStatus(500)
    })
});

// GET route to fetch category table 
router.get('/occasions', rejectUnauthenticated, (req, res) => {

  const sqlQuery = `SELECT * FROM occasions;`;
  
    pool.query(sqlQuery)
      .then( result => {
        // console.log(result.rows);
        res.send(result.rows);
      })
      .catch(err => {
        console.log('dbErr in /api/closet/item/occasions:', err);
        res.sendStatus(500)
      })
});

// GET route to fetch all closet items
router.get('/occasions/:name', rejectUnauthenticated, (req, res) => {

  const sqlQuery = `
    SELECT closet_outfits.*,
      outfits.name,
      outfits.description,
      occasions.name AS occasions,
      JSON_AGG((items, categories.name)) AS items 
    FROM "closet_outfits"
    JOIN "outfits" ON closet_outfits.outfit_id = outfits.id
    JOIN "occasions" ON outfits.id = occasions.id
    JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
    JOIN "items" ON outfit_items.item_id = items.id
    INNER JOIN "categories" ON items.category_id = categories.id
    WHERE closet_outfits.user_id = $1 AND occasions.name = $2
    GROUP BY closet_outfits.id, outfits.id, occasions.id;
  `;
  
  const sqlValues = [req.user.id, req.params.name]
  
  pool.query(sqlQuery, sqlValues)
    .then( result => {
      // console.log('what is', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('dbErr in /api/closet/outfits/occasions:', err);
      res.sendStatus(500)
    })
  });

module.exports = router;
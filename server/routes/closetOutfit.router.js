const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to fetch all closet outfits
router.get('/', rejectUnauthenticated, (req, res) => {

  // This route will also be used as the closetOutfit search route
    let searchQuery = req.query.q;
    // If no query is passed through, it will fetch all outfits normally
    searchQuery += '%';

    // we only want the closet outfit that is related to a specific user purchases. 
    const query = `
      SELECT closet_outfits.*,
        outfits.name,
        outfits.description,
        JSON_AGG((items, categories.name)) AS items 
      FROM "closet_outfits"
      JOIN "outfits" ON closet_outfits.outfit_id = outfits.id
      JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
      JOIN "items" ON outfit_items.item_id = items.id
      INNER JOIN "categories" ON items.category_id = categories.id
      WHERE closet_outfits.user_id = $1
      AND UPPER(outfits.name) LIKE UPPER($2)
      GROUP BY closet_outfits.id, outfits.id;
    `;

    const sqlValues = [req.user.id, searchQuery]

    pool.query(query, sqlValues)
      .then( result => {
        // console.log(result.rows);
        res.send(result.rows);
      })
      .catch(err => {
        console.log('dbErr in /api/closet/oufits:', err);
        res.sendStatus(500)
      })
  });

    // GET route to fetch the selected outfit details information. 
    router.get('/:id', (req, res) => {
      const sqlQuery = `
        SELECT 
          closet_outfits.id, 
          outfits.name,
          outfits.description,
          JSON_AGG((items, categories.name)) AS items
        FROM closet_outfits
        JOIN "outfits" ON closet_outfits.outfit_id = outfits.id
        JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
        JOIN "items" ON items.id = outfit_items.id
        JOIN "categories" ON categories.id = items.category_id
        WHERE closet_outfits.outfit_id = $1
        GROUP BY closet_outfits.id, closet_outfits.user_id, outfits.id;
    `
    const sqlValues = [req.params.id]
    pool.query(sqlQuery, sqlValues)
    .then( getRes => {
      res.send(getRes.rows[0])
      // console.log(getRes.rows[0]); testing
    })
    .catch( getErr => {
      console.log('Error on GET ROUTE SERVER OUTFIT DETAILS', getErr)
      res.sendStatus(500)
    })
  });

module.exports = router;
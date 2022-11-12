const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to fetch all closet outfits
router.get('/', rejectUnauthenticated, (req, res) => {
    // we only want the closet outfit that is related to a specific user purchases. 
    const query = `
      SELECT 
        closet_outfits.id, 
        closet_outfits.user_id,
        outfits.name,
        outfits.description,
        JSON_AGG((items, categories.name)) AS items
      FROM closet_outfits
      JOIN "outfits" ON closet_outfits.outfit_id = outfits.id
      JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
      JOIN "items" ON items.id = outfit_items.id
      JOIN "categories" ON categories.id = items.category_id
      WHERE closet_outfits.user_id = $1
      GROUP BY closet_outfits.id, closet_outfits.user_id, outfits.id;
    `;

    const sqlValues = [req.user.id]

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

module.exports = router;
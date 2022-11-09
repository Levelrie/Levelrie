const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to fetch all closet items
router.get('/', rejectUnauthenticated, (req, res) => {
    // we only want the closet items that is related to a specific user purchases. 
    const query = `
        SELECT * FROM "closet_items"
        JOIN "items" ON closet_items.item_id = items.id
        JOIN "categories" ON items.category_id = categories.id
        WHERE closet_items.user_id = $1;
    `;

    const sqlValues = [req.user.id]

    pool.query(query, sqlValues)
      .then( result => {
        // console.log(result.rows);
        res.send(result.rows);
      })
      .catch(err => {
        console.log('dbErr in /api/closet/items:', err);
        res.sendStatus(500)
      })
  });

module.exports = router;
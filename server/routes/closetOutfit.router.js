const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route to fetch all closet outfits
router.get('/', rejectUnauthenticated, (req, res) => {
    // we only want the closet outfit that is related to a specific user purchases. 
    const sqlquery = `
        SELECT * FROM "closet_outfits"
        JOIN "outfits" ON closet_outfits.outfit_id = outfits.id
        WHERE closet_outfits.user_id = $1;
    `;

    const sqlValues = [req.user.id]

    pool.query(sqlquery, sqlValues)
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
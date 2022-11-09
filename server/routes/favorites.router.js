const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

console.log("fav router");

router.get('/', (req, res) => {
    console.log('in GET /api/favorites/outfits');
    // Fetch all outfits that have been favorited by the user
    const sqlText = `
        SELECT * FROM "favorited_outfits"
        JOIN "outfits" ON favorited_outfits.outfit_id = outfits.id
        WHERE favorited_outfits.user_id = $1;
    `
    const sqlValues = [req.user.id]
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('dbRes.rows is:', dbRes.rows);
            res.send(dbRes.rows)
        }).catch(dbErr => {
            console.log('dbErr in /favorites/outfits:', dbErr);
            res.sendStatus(500);
        })
})

module.exports = router;
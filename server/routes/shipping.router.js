const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Add an item to a user's favorites
router.post('/', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    console.log('BREAKING HERE?????? 0');
    
    const userId = req.user.id;
    const address = req.body.address;


    // add addy info to tabl;e
    const sqlAddAddressText = `INSERT INTO "addresses"
                                    ("user_id", "street_address", "city", "state", "zip")
                                    VALUES
                                    ($1, $2, $3, $4, $5);`
                                    


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');
        console.log('BREAKING HERE?????? 1');

        // Add the item next
        
        await connection.query(sqlAddAddressText, [userId, address.street_address, address.city, address.state, address.zip]);

        console.log('BREAKING HERE?????? 2');
        
        // Confirm successful actions
        await connection.query('COMMIT;');

        console.log('BREAKING HERE?????? 3');

        res.sendStatus(201);


        console.log('BREAKING HERE?????? END 1');

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in POST /shipping', error)
        res.sendStatus(500);
    }  
    connection.release();
});
/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('Yo', req.user)
  const sqlText = `
    SELECT * from "addresses"
        WHERE user_id = $1;
  `
    pool.query(sqlText, [1])
        .then((dbRes) => {
            console.log('dbRes.rows is:', dbRes.rows);
            res.send(dbRes.rows)
        }).catch(dbErr => {
            console.log('dbErr in /shipping:', dbErr);
            res.sendStatus(500);
        })


});


module.exports = router;
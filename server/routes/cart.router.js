const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Add an item to a user's favorites
router.post('/', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    console.log('BREAKING HERE?????? 0');
    
    const userId = req.user.id;
    const itemIds = req.body.itemId;


    // If the outfit isn't yet tied to this user
    //      add the entry to favorited_outfits
    const sqlAddItemText = `INSERT INTO "carts"
                                    ("user_id", "itemId")
                                    VALUES
                                    ($1, $2);`
                                    


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');
        console.log('BREAKING HERE?????? 1');

        // Add the item next
        for(let itemId of itemIds){
          await connection.query(sqlAddItemText, [userId, itemId]);

        console.log('BREAKING HERE?????? 2');
        }
        // Confirm successful actions
        await connection.query('COMMIT;');

        console.log('BREAKING HERE?????? 3');

        res.sendStatus(201);


        console.log('BREAKING HERE?????? END 1');

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in POST /cart', error)
        res.sendStatus(500);
    }  
    connection.release();
});
/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('Yo', req.user)
  const sqlText = `
    SELECT * from "items"
      join "carts" on carts.item_id = items.id
        WHERE carts.user_id = $1;
  `
  const sqlValues = [1]
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('dbRes.rows is:', dbRes.rows[0]);
            res.send(dbRes.rows[0])
        }).catch(dbErr => {
            console.log('dbErr in /favorites/outfits:', dbErr);
            res.sendStatus(500);
        })


});


module.exports = router;
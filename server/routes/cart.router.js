const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Add an item to cart
router.post('/', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    console.log('BREAKING HERE?????? 0');
    
    const userId = req.user.id;
    const itemId = req.body.id;
    console.log('req.body', req.body.id)


    //SQL to add item to carts table
    const sqlAddItemText = `INSERT INTO "carts"
                                    ("user_id", "item_id")
                                    VALUES
                                    ($1, $2);`
                                    


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');
       

        // Add the item next
        
        await connection.query(sqlAddItemText, [userId, itemId]);

       
        
        // Confirm successful actions
        await connection.query('COMMIT;');

        

        res.sendStatus(201);


        

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
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('Yo', req.user)
  const sqlText = `
    SELECT * from "items"
      join "carts" on carts.item_id = items.id
        WHERE carts.user_id = $1;
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


});

router.delete('/', rejectUnauthenticated, async (req, res) =>{
  const userId = req.user.id
  const itemId = req.params.itemId

  const sqlDeleteItem = `DELETE FROM "carts"
                          WHERE "user_id"  = $1
                          AND "item_id"  = $2;`

  const connection = await pool.connect();

  try {
      await connection.query('BEGIN;');

      // Remove the item
      await connection.query(sqlDeleteItem, [userId, itemId]);
      console.log('BREAKING HERE?????? 5');

      // Confirm successful actions
      await connection.query('COMMIT;');

      res.sendStatus(200);


      console.log('BREAKING HERE?????? END 2');

  } catch (error) {
      await connection.query('ROLLBACK;');
      console.log('Error in DELETE /cart item', error)
      res.sendStatus(500);
  }  
  connection.release();
});

router.delete('/all', rejectUnauthenticated, async (req, res) =>{
  const userId = req.user.id

  const sqlDeleteItem = `DELETE FROM "carts"
                          WHERE "user_id"  = $1`

  const connection = await pool.connect();

  try {
      await connection.query('BEGIN;');

      // Remove the item
      await connection.query(sqlDeleteItem, [userId]);
      console.log('BREAKING HERE?????? 5');

      // Confirm successful actions
      await connection.query('COMMIT;');

      res.sendStatus(200);


      console.log('BREAKING HERE?????? END 2');

  } catch (error) {
      await connection.query('ROLLBACK;');
      console.log('Error in DELETE /cart ALL', error)
      res.sendStatus(500);
  }  
  connection.release();
});


module.exports = router;
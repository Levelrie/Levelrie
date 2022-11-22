const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('1Yo', req.user)
    const sqlText = `
    SELECT "name", "color", "size", "seller", "price", "img", addresses.nickname, addresses.street_address, addresses.city, addresses.state, addresses.zip, orders.inserted_at FROM "items"
        JOIN order_items ON order_items.item_id = items.id
            JOIN "orders" ON orders.id = order_items.order_id
                JOIN addresses on addresses.id = orders.addresses_id
                    WHERE orders.user_id = $1 AND order_id = 
                        (
                        SELECT orders.id FROM "orders"
                            WHERE orders.user_id = $1
                                ORDER BY orders.id DESC
                                    LIMIT 1);
  
        `

    const sqlValues = [req.user.id]
      pool.query(sqlText, sqlValues)
          .then((dbRes) => {
              console.log('1dbRes.rows is:', dbRes.rows[0]);
              res.send(dbRes.rows)
          }).catch(dbErr => {
              console.log('1dbErr in /favorites/outfits:', dbErr);
              res.sendStatus(500);
          })
  
  
  });

  router.put('/', rejectUnauthenticated, async (req, res) => {
    const userId = req.user.id
    const buyAddy = 1
    const sqlBuyItems = `
      SELECT * FROM "carts"
        WHERE "user_id" = $1
    `
    const sqlOrderId = `
      INSERT INTO "orders"
        ("user_id", "addresses_id")
          VALUES
            ($1, $2)
              RETURNING "id"
    `
    const sqlOrder = `
      INSERT INTO "order_items"
        ("order_id", "item_id")
          VALUES
            ($1, $2)
    `
    const sqlOrderIdValues = [userId, buyAddy]
    
      const connection = await pool.connect()
      try {
        await connection.query('BEGIN;');
  
        const cart = await connection.query(sqlBuyItems, [userId])
        const order = await connection.query(sqlOrderId, sqlOrderIdValues)
  
        console.log('1cart???', cart.rows)
        console.log('1order', order.rows[0].id)
        for(let item of cart.rows){
          await connection.query(sqlOrder, [order.rows[0].id, item.item_id])
        }
  
      await connection.query('COMMIT;');
  
      res.sendStatus(200)
  
  
  
    } catch (error) {
      await connection.query('ROLLBACK;');
      console.log('1Error in DELETE /cart item', error)
      res.sendStatus(500);
    } 
  
    connection.release();
  })


  router.delete('/', rejectUnauthenticated, async (req, res) =>{
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
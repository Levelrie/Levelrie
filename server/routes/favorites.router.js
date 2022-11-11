const express = require('express');
 const pool = require('../modules/pool');
 const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

 console.log("fav router");

 router.get('/outfits', (req, res) => {
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
});
router.get('/search', rejectUnauthenticated, (req, res) => {
    // ••• This route is forbidden if not logged in •••
    // Search a user's favorited outfits
    
    // General outfit query will target outfits by name
    let query = req.query.q;
    let userId = req.user.id;
    // Add '%' to the end of the query string for the database
    query += '%';
    sqlSearchText = `SELECT outfits.*, 
                            JSON_AGG((items, categories.name)) AS items  
                        FROM "outfits"
                            JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
                            JOIN "items" ON outfit_items.item_id = items.id
                            INNER JOIN "categories" ON items.category_id = categories.id
                            JOIN "favorited_outfits" ON outfits.id = favorited_outfits.outfit_id
                                WHERE outfits.name LIKE $1
                                AND "favorited_outfits".user_id = $2
                                GROUP BY outfits.id;`
    pool.query(sqlSearchText, [query, userId])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/favorites/outfits/search query', error);
            res.sendStatus(500);
        });
});
// Probably put this in a separate router
router.get('/search/item', rejectUnauthenticated, (req, res) => {
    // ••• This route is forbidden if not logged in •••
    // Search a user's favorited items
    
    // General outfit query will target outfits by name
    let query = req.query.q;
    let category = req.query.cat;
    let userId = req.user.id;
    // Add '%' to the end of the query string for the database
    query += '%';
    sqlSearchText = `SELECT items.* FROM "items"
                        JOIN "categories" ON items.category_id = categories.id
                        JOIN "favorited_items" ON items.id = favorited_items.item_id
                        JOIN "favorited_outfits" ON favorited_items.favorited_outfit_id = favorited_outfits.id
                            WHERE items.name LIKE $1
                            AND categories.name = $2
                            AND "favorited_outfits".user_id = $3;`
    pool.query(sqlSearchText, [query, category, userId])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/favorites/outfits/search/item query', error);
            res.sendStatus(500);
        });

 });



 router.get('/items', (req, res) => {
    console.log('in GET /api/favorites/items');

    // need to add in category -- hard coding for now until figuring out front-end
    // const category = req.category;
    const category = 'top';

    // Fetch all items that have been favorited by the user by category
    const sqlText = `
    SELECT items.* FROM "items"
    JOIN "categories" ON items.category_id = categories.id
    JOIN "favorited_items" ON items.id = favorited_items.item_id
    JOIN "favorited_outfits" ON favorited_items.favorited_outfit_id = favorited_outfits.id
        WHERE categories.name = 'accessories'
            AND "favorited_outfits".user_id = $1
    UNION
    SELECT items.* FROM "items"
        JOIN "categories" ON items.category_id = categories.id
        JOIN "favorited_solo" ON items.id = favorited_solo.item_id
        JOIN "users" ON favorited_solo.user_id = "users".id
            WHERE categories.name = 'accessories'
                AND "favorited_solo".user_id = $1
    `
    const sqlValues = [req.user.id]
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('dbRes.rows is:', dbRes.rows);
            res.send(dbRes.rows)
        }).catch(dbErr => {
            console.log('dbErr in /favorites/items:', dbErr);
            res.sendStatus(500);
        })
});



 module.exports = router;
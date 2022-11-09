const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/search/outfit', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••

    // Search a user's closet outfits
    
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
                            JOIN "closet_outfits" ON outfits.id = closet_outfits.outfit_id
                                WHERE outfits.name LIKE $1
                                AND "closet_outfits".user_id = $2
                                GROUP BY outfits.id;`

    pool.query(sqlSearchText, [query, userId])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/closet/search/outfit query', error);
            res.sendStatus(500);
        });

});

router.get('/search/item', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••

    // Search a user's closet items by category
    
    // General outfit query will target outfits by name
    let query = req.query.q;
    let category = req.query.cat;
    let userId = req.user.id;

    // Add '%' to the end of the query string for the database
    query += '%';

    sqlSearchText = `SELECT items.* FROM "items"
                        JOIN "categories" ON items.category_id = categories.id
                        JOIN "closet_items" ON items.id = closet_items.item_id
                            WHERE items.name LIKE $1
                            AND categories.name = $2
                            AND "closet_items".user_id = $3;`

    pool.query(sqlSearchText, [query, category, userId])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/closet/search/item query', error);
            res.sendStatus(500);
        });

});


module.exports = router;
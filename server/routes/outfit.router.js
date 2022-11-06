const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// •••••••••••••••••••••••••••••••••••••••• HOME VIEW ROUTES BELOW ••••••••••••••••••••••••••••••••••••••••

// Fetch all outfits that haven't already been rejected by the user
//      and all outfits that haven't already been saved by the user
router.get('/', (req, res) => {

    const userId = req.user.id;

    // For the time being, there is no return limit
    // This query will return rows containing outfits and arrays of that outfit's items
    const sqlText = `SELECT outfits.*, ARRAY_AGG(items.*) FROM "outfits"
                        JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
                        JOIN "items" ON outfit_items.item_id = items.id
                        JOIN "favorited_outfits" ON outfits.id = favorited_outfits.outfit_id
                        JOIN "rejections" ON outfits.id = rejections.outfit_id
                            WHERE favorited_outfits.user_id != $1
                            AND rejections.user_id != $1
                            GROUP BY outfits.id;`

    pool.query(sqlText, [userId])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/outfit query', error)
            res.sendStatus(500);
        });
});

// Add an outfit to a user's rejections
router.post('/reject', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    
    const userId = req.user.id;
    const outfitId = req.body;

    const sqlText = `INSERT INTO "rejections"
                    ("user_id", "outfit_id")
                    VALUES
                    ($1, $2);`


    pool.query(sqlText, [userId, outfitId])
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST /api/outfit/reject query', error)
            res.sendStatus(500);
        });
});

// Add an outfit and ALL its items to a user's favorites
router.post('/favorite', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••
    
    const userId = req.user.id;
    const outfitId = req.body;

    // First, fetch all the items associated with this outfit
    const sqlFetchItemsText = `SELECT * FROM "items"
                            JOIN "outfit_items" ON items.id = outfit_items.item_id
                            JOIN "outfits" ON outfit_items.outfit_id = outfits.id
                                WHERE outfits.id = $1;`

    // Then, add the favorited outfit and its items to their respective favorites tables
    const sqlInsertOutfitText = `INSERT INTO "favorited_outfits"
                                ("user_id", "outfit_id")
                                VALUES
                                ($1, $2);`

    // This needs to have a loop
    const sqlInsertItemsText = `INSERT INTO "favorited_items"
                                ("favorited_outfit_id", "item_id")
                                VALUES
                                ($1, $2);`

    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        const itemsToAdd = await connection.query(sqlFetchItemsText, [outfitId]);

        // Add the outfit first
        await connection.query(sqlInsertOutfitText, [userId, outfitId]);

        // Add the items next
        for (let i = 0; i < itemsToAdd.rows.length; i++) {
            await connection.query(sqlInsertItemsText, [outfitId, itemsToAdd.rows[i].id]);
        }

        // Confirm successful actions
        await connection.query('COMMIT;');

        res.sendStatus(201);

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in POST /api/outfit/favoriteOutfit queries', error)
        res.sendStatus(500);
    }

});

module.exports = router;
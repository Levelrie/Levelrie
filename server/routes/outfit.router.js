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
    // This query will return rows containing outfits, arrays of that outfit's items,
    //      and user_ids associated with users who have favorited or rejected this outfit as favoritedBy and rejectedBy respectively
    //      for ALL outfits
    // Results must be filtered to remove any outfit result that contains the current user's id
    // If a result row contains an outfit with id 1 and has a the current user's id in favoritedBy OR rejectedBy
    // ALL result rows containing outfit with id 1 must be removed
    const sqlText = `SELECT outfits.*, 
                            favorited_outfits.user_id AS favoritedBy, 
                            rejections.user_id AS rejectedBy, 
                            ARRAY_AGG((items, categories.name)) AS items 
                     FROM "outfits"
                            JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
                            JOIN "items" ON outfit_items.item_id = items.id
                            INNER JOIN "categories" ON items.category_id = categories.id
                            LEFT JOIN "favorited_outfits" ON outfits.id = favorited_outfits.outfit_id
                            LEFT JOIN "rejections" ON outfits.id = rejections.outfit_id
                                GROUP BY outfits.id, favorited_outfits.user_id, rejections.user_id;`

    pool.query(sqlText, [userId])
        .then((results) => {
            let outfits = results.rows;
            let outfitIdsToDelete = [];

            // Make array recording outfit IDs associated with current user
            for (let i = 0; i < outfits.length; i++) {
                if (outfits[i].favoritedBy == userId || outfits[i].rejectedBy == userId) {
                    outfitIdsToDelete.push(outfits[i].id);
                }
            }

            // Remove all objects with recorded outfit ids
            for (let i = 0; i < outfitIdsToDelete.length; i++) {
                for (let j = 0; j < outfits.length; j++) {
                    if (outfits[j].id = outfitIdsToDelete[i]) {
                        outfits.splice(j, 1);
                    }
                }
            }

            // Filter results to contain only one instance of each outfit ID
            for (let i = 0; i < outfits.length; i++) {
                for (let j = 0; j < outfits.length; j++) {
                    if (outfits[i].id == outfits[j].id) {
                        outfits.splice(j, 1);
                    }
                }
            }

            res.send(outfits);
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
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// •••••••••••••••••••••••••••••••••••••••• HOME VIEW ROUTES BELOW ••••••••••••••••••••••••••••••••••••••••

// Fetch all outfits that haven't already been rejected by the user
//      and all outfits that haven't already been saved by the user
router.get('/home', (req, res) => {

    const userId = req.user.id;

    // For the time being, there is no return limit
    // This query will return rows containing outfits, arrays of that outfit's items,
    //      and user_ids associated with users who have favorited or rejected this outfit as favoritedBy and rejectedBy respectively
    //      for ALL outfits
    // Results must be filtered to remove any outfit result that contains the current user's id
    // If a result row contains an outfit with id 1 and has a the current user's id in favoritedBy OR rejectedBy
    // ALL result rows containing outfit with id 1 must be removed
    const sqlText = `SELECT outfits.*, 
                            favorited_outfits.user_id AS favorited_by, 
                            rejections.user_id AS rejected_by, 
                            JSON_AGG((items, categories.name)) AS items 
                    FROM "outfits"
                            JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
                            JOIN "items" ON outfit_items.item_id = items.id
                            INNER JOIN "categories" ON items.category_id = categories.id
                            LEFT JOIN "favorited_outfits" ON outfits.id = favorited_outfits.outfit_id
                            LEFT JOIN "rejections" ON outfits.id = rejections.outfit_id
                                GROUP BY outfits.id, favorited_outfits.user_id, rejections.user_id;`

    pool.query(sqlText)
        .then((results) => {
            let outfits = results.rows;
            let outfitIdsToDelete = [];

            console.log('Outfits 1', outfits);

            // Make array recording outfit IDs associated with current user
            for (let i = 0; i < outfits.length; i++) {
                console.log('favorited by?', outfits[i].favorited_by)
                if (outfits[i].favorited_by == userId || outfits[i].rejected_by == userId) {
                    outfitIdsToDelete.push(outfits[i].id);
                }
            }

            console.log('to delete:', outfitIdsToDelete);

            // Remove all objects with recorded outfit ids
            for (let i = 0; i < outfitIdsToDelete.length; i++) {
                outfits = outfits.filter(outfit => outfit.id != outfitIdsToDelete[i]);
            }

            console.log('OUTFITS 2:', outfits);

            // Filter results to contain only one instance of each outfit ID
            for (let i = 0; i < outfits.length; i++) {
                for (let j = 1; j < outfits.length - 1; j++) {
                    if (outfits[i].id == outfits[j].id) {
                        outfits.splice(j, 1);
                    }
                }
            }

            console.log('OUTFITS 2 SEND:', outfits);

            res.send(outfits);
        })
        .catch((error) => {
            console.log('Error in GET /api/outfit query', error)
            res.sendStatus(500);
        });
});

// Add an outfit to a user's rejections
router.post('/reject', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••
    
    const userId = req.user.id;
    const outfitId = req.body.outfitId;

    // Insert into rejections
    const sqlInsertText = `INSERT INTO "rejections"
                    ("user_id", "outfit_id")
                    VALUES
                    ($1, $2);`

    // Search if this outfit has any favorited items
    const sqlSearchText = `SELECT "id" FROM "favorited_outfits"
                                WHERE "user_id" = $1
                                AND "outfit_id" = $2;`

    // If this item has been favorited
    //      Remove from favorited_items and favorited_outfits
    const sqlDeleteItemsText = `DELETE FROM "favorited_items"
                                    WHERE "favorited_outfit_id" = $1;`

    const sqlDeleteOutfitText = `DELETE FROM "favorited_outfits"
                                    WHERE "id" = $1;`


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        // Insert into rejections
        await connection.query(sqlInsertText, [userId, outfitId]);


        // Search if this outfit has any favorited items
        const searchIdResults = await connection.query(sqlSearchText, [userId, outfitId]);

        // If this item has been favorited
        if (searchIdResults.rows.length != 0) {
            await connection.query(sqlDeleteItemsText, [searchIdResults.rows[0].id]);
            await connection.query(sqlDeleteOutfitText, [searchIdResults.rows[0].id]);
        }

        await connection.query('COMMIT;');

        res.sendStatus(201);

    } catch (error) {
        console.log('Error in POST /api/outfit/reject queries', error)
        res.sendStatus(500);
    }
    connection.release();
});

// Add an outfit and ALL its items to a user's favorites
router.post('/favorite', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••
    
    const userId = req.user.id;
    const outfitId = req.body.outfitId;

    // First, fetch all the items associated with this outfit
    const sqlFetchItemsText = `SELECT * FROM "items"
                            JOIN "outfit_items" ON items.id = outfit_items.item_id
                            JOIN "outfits" ON outfit_items.outfit_id = outfits.id
                                WHERE outfits.id = $1;`

    // Check if favorited_outfits already has an entry for this outfit and user
    //         Would occur if this user favorited an outfit from HOME, then swiped right as well
    const sqlCheckForOutfitText = `SELECT "id" FROM "favorited_outfits"
                                    WHERE "user_id" = $1
                                    AND "outfit_id" = $2;`

    // Then, add the favorited outfit and its items to their respective favorites tables
    const sqlInsertOutfitText = `INSERT INTO "favorited_outfits"
                                ("user_id", "outfit_id")
                                VALUES
                                ($1, $2)
                                RETURNING "id";`


    // Check text for preexisting item in favorited_items table
    const sqlCheckForItemText = `SELECT * FROM "favorited_items"
                                    WHERE "favorited_outfit_id" = $1
                                    AND "item_id" = $2;`

    // This needs to have a loop
    const sqlInsertItemsText = `INSERT INTO "favorited_items"
                                ("favorited_outfit_id", "item_id")
                                VALUES
                                ($1, $2);`

    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        const itemsToAdd = await connection.query(sqlFetchItemsText, [outfitId]);

        // Check for the existing outfit
        let favoritedOutfitId = await connection.query(sqlCheckForOutfitText, [userId, outfitId]);


        // If the outfit doesn't exist in favorited_outfits
        if (favoritedOutfitId.rows.length === 0) {
            // Add the outfit and get the id
            favoritedOutfitId = await connection.query(sqlInsertOutfitText, [userId, outfitId]);
        }

        // Add the items next
        for (let i = 0; i < itemsToAdd.rows.length; i++) {
            // Check first that an item doesn't already exist in the table with this outfit
            const existenceCheck = await connection.query(sqlCheckForItemText, [favoritedOutfitId.rows[0].id, itemsToAdd.rows[i].item_id]);
            if (existenceCheck.rows.length === 0) {
                await connection.query(sqlInsertItemsText, [favoritedOutfitId.rows[0].id, itemsToAdd.rows[i].item_id]);
            }
        }

        // Confirm successful actions
        await connection.query('COMMIT;');

        res.sendStatus(201);

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in POST /api/outfit/favorite queries', error)
        res.sendStatus(500);
    }
    connection.release();
});

// •••••••••••••••••••••••••••••••••••••••• GLOBAL SEARCH VIEW ROUTE BELOW ••••••••••••••••••••••••••••••••••••••••
router.get('/search', (req, res) => {

    // General outfit query will target outfits by name
    let query = req.query.q;

    // Add '%' to the end of the query string for the database
    if (query != '') {
        query += '%';
    }

    // console.log('query!!', query);

    sqlSearchText = `SELECT outfits.*, 
                            JSON_AGG((items, categories.name)) AS items  
                     FROM "outfits"
                            JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
                            JOIN "items" ON outfit_items.item_id = items.id
                            INNER JOIN "categories" ON items.category_id = categories.id
                                WHERE UPPER(outfits.name) LIKE UPPER($1)
                                GROUP BY outfits.id;`

    pool.query(sqlSearchText, [query])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/outfit/search query', error);
            res.sendStatus(500);
        });
});


module.exports = router;
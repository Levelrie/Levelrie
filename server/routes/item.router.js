const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Add an item to a user's favorites
router.post('/favorite', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    console.log('BREAKING HERE?????? 0');
    
    const userId = req.user.id;
    const itemId = req.body.itemId;
    const outfitId = req.body.outfitId;

    // First, check if this outfit is already in the favorited outfits table
    //      associated with this user's id
    const sqlCheckText = `SELECT "id" FROM "favorited_outfits"
                            WHERE "user_id" = $1
                            AND "outfit_id" = $2;`

    // If the outfit isn't yet tied to this user
    //      add the entry to favorited_outfits
    const sqlAddOutfitText = `INSERT INTO "favorited_outfits"
                                    ("user_id", "outfit_id")
                                    VALUES
                                    ($1, $2)
                                    RETURNING "id";`
                                    
    // Lastly, add the item to favorited items
    const sqlAddItemText = `INSERT INTO "favorited_items"
                                ("favorited_outfit_id", "item_id")
                                VALUES
                                ($1, $2);`

    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        // Check for existing outfit (see line 23)
        let favoritedOutfitId = await connection.query(sqlCheckText, [userId, outfitId]);

        console.log('BREAKING HERE?????? 1');

        // If it doesn't exist ...
        if (favoritedOutfitId.rows.length === 0) {
            // Add the outfit first
            favoritedOutfitId = await connection.query(sqlAddOutfitText, [userId, outfitId]);
        }

        // Add the item next
        await connection.query(sqlAddItemText, [favoritedOutfitId.rows[0].id, itemId]);

        console.log('BREAKING HERE?????? 2');

        // Confirm successful actions
        await connection.query('COMMIT;');

        console.log('BREAKING HERE?????? 3');

        res.sendStatus(201);


        console.log('BREAKING HERE?????? END 1');

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in POST /api/item/favorite queries', error)
        res.sendStatus(500);
    }  
    connection.release();
});

router.delete('/unfavorite/:itemId/:outfitId', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••


    console.log('BREAKING HERE?????? 4');

    const userId = req.user.id;
    const itemId = req.params.itemId;
    const outfitId = req.params.outfitId;

    // Fetch favorited_outfits id associated with this outfit and user
    const sqlFavoritedOutfitId = `SELECT "id" FROM "favorited_outfits"
                                    WHERE "user_id" = $1
                                    AND "outfit_id" = $2;`

    // Remove the item
    const sqlUnfavoriteText = `DELETE FROM "favorited_items"
                                    WHERE "favorited_outfit_id" = $1
                                    AND "item_id" = $2;`

    // Check if there's anymore favorited items remaining
    const sqlCheckIfAnyItemsRemaining = `SELECT * FROM "favorited_items"
                                            WHERE "favorited_outfit_id" = $1;`

    // If all items in this outfit have been unfavorited by the user
    //      Remove the initial favorited_outfits entry
    const sqlRemoveOutfitText = `DELETE FROM "favorited_outfits"
                                    WHERE "user_id" = $1
                                    AND "outfit_id" = $2;`


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        // Fetch favorited_outfits id
        const favoritedOutfitId = await connection.query(sqlFavoritedOutfitId, [userId, outfitId]);

        // console.log('ID!!!!!!!', favoritedOutfitId)

        // Remove the item
        await connection.query(sqlUnfavoriteText, [favoritedOutfitId.rows[0].id, itemId]);

        // Check for favorited items remaining
        const remainingItems = await connection.query(sqlCheckIfAnyItemsRemaining, [favoritedOutfitId.rows[0].id]);


        console.log('BREAKING HERE?????? 5');

        // If there aren't any ...
        if (remainingItems.rows.length === 0) {
            // Remove the favorited outfit
            await connection.query(sqlRemoveOutfitText, [userId, outfitId]);
        }

        // Confirm successful actions
        await connection.query('COMMIT;');

        res.sendStatus(200);


        console.log('BREAKING HERE?????? END 2');

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in DELETE /api/item/unfavorite queries', error)
        res.sendStatus(500);
    }  
    connection.release();
});

// •••••••••••••••••••••••••••••••••••••••• GLOBAL SEARCH VIEW ROUTE BELOW ••••••••••••••••••••••••••••••••••••••••

router.get('/search', (req, res) => { 
    
    // Item query will target outfits by name and category
    let query = req.query.q;

    let category = req.query.cat;

    // Add '%' to the end of the query string for the database
    query += '%';

    const sqlSearchText = `SELECT items.* FROM "items"
                        JOIN "categories" ON items.category_id = categories.id
                            WHERE items.name LIKE $1
                            AND categories.name = $2;`

    pool.query(sqlSearchText, [query, category])
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Error in GET /api/item/search query', error);
        res.sendStatus(500);
    });

});

// •••••••••••••••••••••••••••••••••••••••• FETCH CATEGORY NAMES ROUTE BELOW ••••••••••••••••••••••••••••••••••••••••


router.get('/categories', (req, res) => {

    const sqlFetchText = `SELECT * FROM "categories"
        ORDER BY CASE   
            WHEN name = 'outerwear' THEN 1
            WHEN name = 'top' THEN 2
            WHEN name = 'accessories' THEN 3
            WHEN name = 'bottom' THEN 4
            WHEN name = 'footwear' THEN 5
            ELSE 6
        END
        LIMIT 5
        ;`

    pool.query(sqlFetchText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Error in GET /api/item/categories query', error);
        res.sendStatus(500);
    });

});

// •••••••••••••••••••••••••••••••••••••••• FETCH ITEMS ROUTE BELOW ••••••••••••••••••••••••••••••••••••••••

router.get('/all', (req, res) => {
    // console.log('category id:', req.params.id);
    // const category_id = req.params.id;
    const sqlFetchText = `SELECT * FROM "items"
        ORDER BY category_id
        ;`
    pool.query(sqlFetchText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Error in GET /api/item/all query', error);
        res.sendStatus(500);
    });
});

// router.get('/all/:id', async (req, res) => {
//     // console.log('category id:', req.params.id);
//     const category_id = req.params.id;
//     const sqlFetchText = `SELECT * FROM "items"
//         WHERE category_id = $1
//         ;`
//     const connection = await pool.connect();
//     try {
//         await connection.query('BEGIN;');
//         await connection.query(sqlFetchText, [category_id]);
//         res.send(someShitGoesHereMaybe??);
//     } catch (error) {
//         await connection.query('ROLLBACK;');
//         console.log('Error in GET /api/item/all queries', error)
//         res.sendStatus(500);
//     }  
//     connection.release();
// });

module.exports = router;
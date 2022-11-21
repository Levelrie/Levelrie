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

// •••••••••••••••••••••••••••••••••••••••• GLOBAL SEARCH VIEW ROUTES BELOW ••••••••••••••••••••••••••••••••••••••••

router.get('/search', (req, res) => { 
    
    // Item query will target outfits by name and category
    let query = req.query.q;

    let category = req.query.cat;

    // Add '%' to the end of the query string for the database
    if (query != '') {
        query += '%';
    }

    const sqlSearchText = `SELECT items.* FROM "items"
                        JOIN "categories" ON items.category_id = categories.id
                            WHERE UPPER(items.name) LIKE UPPER($1)
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

router.post('/search/favorite', rejectUnauthenticated, (req, res) => {

    const itemId = req.body.itemId;

    const sqlInsertText = `INSERT INTO "favorited_solo"
                                ("user_id", "item_id")
                                VALUES
                                ($1, $2);`
    
    pool.query(sqlInsertText, [req.user.id, itemId])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST /api/item/search/favorite query', error);
            res.sendStatus(500);
        });

});

router.delete('/search/unfavorite/:id', rejectUnauthenticated, (req, res) => {
    
    const itemId = req.params.id;

    const sqlDeleteText = `DELETE FROM "favorited_solo"
                                WHERE ctid IN (SELECT ctid FROM "favorited_solo"
                                WHERE "user_id" = $1
                                AND "item_id" = $2
                                LIMIT 1
                            );`

    pool.query(sqlDeleteText, [req.user.id, itemId])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error in POST /api/item/search/unfavorite query', error);
        res.sendStatus(500);
    });

})

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
        LIMIT 6
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

// Selects all items, limited by one per distinct item name
router.get('/design', (req, res) => {
    const sqlFetchText = `SELECT * FROM "items" WHERE
                            items.id IN (SELECT max(items.id) FROM "items" GROUP BY items.name)
                            ORDER BY items.category_id;`

    pool.query(sqlFetchText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('Error in GET /api/item/design query', error);
        res.sendStatus(500);
    });
})

// •••••••••••••••••••••••••••••••••••••••• CHANGE A FAVORITED ITEM'S COLOR AND SIZE ROUTES BELOW ••••••••••••••••••••••••••••••••••••••••

router.put('/changecolor', rejectUnauthenticated, async (req, res) => {

    const item = req.body.item;
    const newColor = req.body.newColor;

    const sqlFetchTextOldItem = `SELECT favorited_items.id AS favorited_items_id, * FROM "favorited_items"
                                    JOIN "favorited_outfits" ON favorited_items.favorited_outfit_id = favorited_outfits.id
                                    JOIN "items" ON favorited_items.item_id = items.id
                                        WHERE favorited_outfits.user_id = $1
                                        AND items.name = $2
                                        AND items.color = $3
                                        AND items.size = $4
                                        AND items.seller = $5
                                        AND items.price = $6
                                        AND items.img = $7
                                        AND items.category_id = $8;`

    const sqlFetchTextOldItemAgain = `SELECT "items".id AS items_id, "favorited_solo".id as favorited_solo_id FROM "favorited_solo"
                                        JOIN "items" ON favorited_solo.item_id = items.id
                                            WHERE favorited_solo.user_id = $1
                                            AND items.name = $2
                                            AND items.color = $3
                                            AND items.size = $4
                                            AND items.seller = $5
                                            AND items.price = $6
                                            AND items.img = $7
                                            AND items.category_id = $8;`

    const sqlFetchTextNewItem = `SELECT id FROM "items"
                                    WHERE name = $1
                                    AND color = $2;`

    const sqlDeleteText = `DELETE FROM "favorited_items"
                                WHERE id = $1;`

    const sqlDeleteTextAgain = `DELETE FROM "favorited_solo"
                                    WHERE id = $1
                                    AND user_id = $2;`


    const sqlInsertNewText = `INSERT INTO "favorited_items"
                                ("favorited_outfit_id", "item_id")
                                VALUES
                                ($1, $2);`

    const sqlInsertNewTextAgain = `INSERT INTO "favorited_solo"
                                    ("user_id", "item_id")
                                    VALUES
                                    ($1, $2);`


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        let oldItem = await connection.query(sqlFetchTextOldItem, [req.user.id, item.name, item.color, item.size, item.seller, item.price, item.img, item.category_id]);

        console.log('OLDITEM !!!!!!', oldItem.rows)

        let newItem = await connection.query(sqlFetchTextNewItem, [item.name, newColor]);

        if (oldItem.rows.length === 0) {
            // Fetch and delete from favorited-solo instead
            oldItem = await connection.query(sqlFetchTextOldItemAgain, [req.user.id, item.name, item.color, item.size, item.seller, item.price, item.img, item.category_id]);
            await connection.query(sqlDeleteTextAgain, [oldItem.rows[0].favorited_solo_id, req.user.id]);
            await connection.query(sqlInsertNewTextAgain, [req.user.id, newItem.rows[0].id]);
        } else {
            await connection.query(sqlDeleteText, [oldItem.rows[0].favorited_items_id]);
            console.log('DELETING', oldItem.rows[0].favorited_items_id)
            await connection.query(sqlInsertNewText, [oldItem.rows[0].favorited_outfit_id, newItem.rows[0].id]);
        }

        await connection.query('COMMIT;');

        res.sendStatus(200);


    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in PUT /api/item/changecolor queries', error)
        res.sendStatus(500);
    } finally {
        connection.release();
    }

});

router.put('/changesize', rejectUnauthenticated, async (req, res) => {

    const item = req.body.item;
    const newSize = req.body.newSize;

    const sqlFetchTextOldItem = `SELECT favorited_items.id AS favorited_items_id, * FROM "favorited_items"
                                    JOIN "favorited_outfits" ON favorited_items.favorited_outfit_id = favorited_outfits.id
                                    JOIN "items" ON favorited_items.item_id = items.id
                                        WHERE favorited_outfits.user_id = $1
                                        AND items.name = $2
                                        AND items.color = $3
                                        AND items.size = $4
                                        AND items.seller = $5
                                        AND items.price = $6
                                        AND items.img = $7
                                        AND items.category_id = $8;`

    const sqlFetchTextOldItemAgain = `SELECT "items".id AS items_id, "favorited_solo".id as favorited_solo_id FROM "favorited_solo"
                                        JOIN "items" ON favorited_solo.item_id = items.id
                                            WHERE favorited_solo.user_id = $1
                                            AND items.name = $2
                                            AND items.color = $3
                                            AND items.size = $4
                                            AND items.seller = $5
                                            AND items.price = $6
                                            AND items.img = $7
                                            AND items.category_id = $8;`

    const sqlFetchTextNewItem = `SELECT id FROM "items"
                                    WHERE name = $1
                                    AND size = $2;`

    const sqlDeleteText = `DELETE FROM "favorited_items"
                                WHERE id = $1;`

    const sqlDeleteTextAgain = `DELETE FROM "favorited_solo"
                                    WHERE id = $1
                                    AND user_id = $2;`


    const sqlInsertNewText = `INSERT INTO "favorited_items"
                                ("favorited_outfit_id", "item_id")
                                VALUES
                                ($1, $2);`

    const sqlInsertNewTextAgain = `INSERT INTO "favorited_solo"
                                    ("user_id", "item_id")
                                    VALUES
                                    ($1, $2);`


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        let oldItem = await connection.query(sqlFetchTextOldItem, [req.user.id, item.name, item.color, item.size, item.seller, item.price, item.img, item.category_id]);

        console.log('OLDITEM !!!!!!', oldItem.rows)

        let newItem = await connection.query(sqlFetchTextNewItem, [item.name, newSize]);

        if (oldItem.rows.length === 0) {
            // Fetch and delete from favorited-solo instead
            oldItem = await connection.query(sqlFetchTextOldItemAgain, [req.user.id, item.name, item.color, item.size, item.seller, item.price, item.img, item.category_id]);
            await connection.query(sqlDeleteTextAgain, [oldItem.rows[0].favorited_solo_id, req.user.id]);
            await connection.query(sqlInsertNewTextAgain, [req.user.id, newItem.rows[0].id]);
        } else {
            await connection.query(sqlDeleteText, [oldItem.rows[0].favorited_items_id]);
            console.log('DELETING', oldItem.rows[0].favorited_items_id)
            await connection.query(sqlInsertNewText, [oldItem.rows[0].favorited_outfit_id, newItem.rows[0].id]);
        }

        await connection.query('COMMIT;');

        res.sendStatus(200);


    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in PUT /api/item/changesize queries', error)
        res.sendStatus(500);
    } finally {
        connection.release();
    }

});


module.exports = router;
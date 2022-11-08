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

module.exports = router;
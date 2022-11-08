const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Add an item to a user's favorites
router.post('/favorite', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••
    
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

        // If it doesn't exist ...
        if (favoritedOutfitId.rows.length === 0) {
            // Add the outfit first
            favoritedOutfitId = await connection.query(sqlAddOutfitText, [userId, outfitId]);
        }

        // Add the item next
        await connection.query(sqlAddItemText, [favoritedOutfitId, itemId]);

        // Confirm successful actions
        await connection.query('COMMIT;');

        res.sendStatus(201);

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in POST /api/item/favorite queries', error)
        res.sendStatus(500);
    }  
});

router.delete('/unfavorite/:id', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    const userId = req.user.id;
    const itemId = req.body.itemId;
    const outfitId = req.body.outfitId;

});

module.exports = router;
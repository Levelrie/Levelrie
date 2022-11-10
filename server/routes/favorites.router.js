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
})


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
                WHERE categories.name = $1
                    AND "favorited_outfits".user_id = $2;
    `
    const sqlValues = [category, req.user.id]
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('dbRes.rows is:', dbRes.rows);
            res.send(dbRes.rows)
        }).catch(dbErr => {
            console.log('dbErr in /favorites/items:', dbErr);
            res.sendStatus(500);
        })
})

module.exports = router;
const express = require('express');
 const pool = require('../modules/pool');
 const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

 router.get('/outfits', (req, res) => {
     console.log('in GET /api/favorites/outfits');
     // Fetch all outfits that have been favorited by the user
     // AND associated items
     const sqlText = `
     SELECT favorited_outfits.*,
        JSON_AGG((items, categories.name)) AS items
            FROM "favorited_outfits"
                JOIN "outfits" ON favorited_outfits.outfit_id = outfits.id
                JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
                JOIN "items" ON outfit_items.item_id = items.id
                    INNER JOIN "categories" ON items.category_id = categories.id
                        WHERE favorited_outfits.user_id = $1
                            GROUP BY favorited_outfits.id;
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


router.get('/outfits/:id', (req, res) => {
    console.log('in GET /api/favorites/outfits:id');
    // Fetch all outfits that have been favorited by the user
    // AND associated items
    // With the selected occasion
    console.log('here is req.params.id:', req.params.id)
    const sqlText = `
    SELECT favorited_outfits.*,
       JSON_AGG((items, categories.name)) AS items
           FROM "favorited_outfits"
               JOIN "outfits" ON favorited_outfits.outfit_id = outfits.id
               JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
               JOIN "items" ON outfit_items.item_id = items.id
                   INNER JOIN "categories" ON items.category_id = categories.id
                       WHERE favorited_outfits.user_id = $1
                           AND outfits.occasion_id = $2
                           GROUP BY favorited_outfits.id;
   `
   const sqlValues = [req.user.id, req.params.id]
   pool.query(sqlText, sqlValues)
       .then((dbRes) => {
           console.log('dbRes.rows is:', dbRes.rows);
           res.send(dbRes.rows)
       }).catch(dbErr => {
           console.log('dbErr in /favorites/outfits/:id', dbErr);
           res.sendStatus(500);
       })
});

// router.get('/outfits/:id/:outfitId', (req, res) => {
//     console.log('in GET /api/favorites/outfits:id:outfitId');
//     // Fetch all outfits that have been favorited by the user
//     // AND associated items
//     // With the selected occasion
//     console.log('here is req.params.id:', req.params.id)
//     const sqlText = `
//     SELECT favorited_outfits.*,
//        JSON_AGG((items, categories.name)) AS items
//            FROM "favorited_outfits"
//                JOIN "outfits" ON favorited_outfits.outfit_id = outfits.id
//                JOIN "outfit_items" ON outfits.id = outfit_items.outfit_id
//                JOIN "items" ON outfit_items.item_id = items.id
//                    INNER JOIN "categories" ON items.category_id = categories.id
//                        WHERE favorited_outfits.user_id = $1
//                            AND outfits.occasion_id = $2
//                            GROUP BY favorited_outfits.id;
//    `
//    const sqlValues = [req.user.id, req.params.id]
//    pool.query(sqlText, sqlValues)
//        .then((dbRes) => {
//            console.log('dbRes.rows is:', dbRes.rows);
//            res.send(dbRes.rows)
//        }).catch(dbErr => {
//            console.log('dbErr in /favorites/outfits/:id', dbErr);
//            res.sendStatus(500);
//        })
// });

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
                                WHERE UPPER(outfits.name) LIKE UPPER($1)
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
                            WHERE UPPER(items.name) LIKE UPPER($1)
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



 router.get('/items/:id', (req, res) => {
    console.log('in GET /api/favorites/items/:id');

    // need to add in category -- hard coding for now until figuring out front-end
    // const category = req.category;
    // const category = 'top';

    // Fetch all items that have been favorited by the user by category
    const sqlText = `
    SELECT results.id, results.name, results.color, results.size, results.seller, results.price, results.img, results.category_id, SUM(count) AS count FROM (
        SELECT items.*, COUNT(items.id) AS count FROM "items"
        JOIN "categories" ON items.category_id = categories.id
        JOIN "favorited_items" ON items.id = favorited_items.item_id
        JOIN "favorited_outfits" ON favorited_items.favorited_outfit_id = favorited_outfits.id
            WHERE categories.name = $1
                AND "favorited_outfits".user_id = $2
                GROUP BY items.id
        UNION
        SELECT items.*, COUNT(items.id) AS count FROM "items"
            JOIN "categories" ON items.category_id = categories.id
            JOIN "favorited_solo" ON items.id = favorited_solo.item_id
            JOIN "users" ON favorited_solo.user_id = "users".id
                WHERE categories.name = $1
                    AND "favorited_solo".user_id = $2
                    GROUP BY items.id
        ) results 
 	GROUP BY results.id, results.name, results.color, results.size, results.seller, results.price, results.img, results.category_id;
    `
    const sqlValues = [req.params.id, req.user.id]
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('dbRes.rows is:', dbRes.rows);
            res.send(dbRes.rows)
        }).catch(dbErr => {
            console.log('dbErr in /favorites/items:', dbErr);
            res.sendStatus(500);
        })
});

router.delete('/items/decrease/:id/:quantity', rejectUnauthenticated, async (req, res) => {
    const userId = req.user.id;
    const itemId = req.params.id;
    const quantity = req.params.quantity;

    console.log('USER!', userId);
    console.log('ITEM!', itemId);
    console.log('QUANT!', quantity);

    const sqlSearchText = `SELECT * FROM "favorited_solo"
                                WHERE "user_id" = $1
                                AND "item_id" = $2;`

    const sqlDeleteFromSoloText = `DELETE FROM "favorited_solo"
                                        WHERE ctid IN (SELECT ctid FROM "favorited_solo"
                                            WHERE "user_id" = $1
                                            AND "item_id" = $2
                                            LIMIT 1
                                        );`

    const sqlDeleteFromFaveItems = `DELETE FROM "favorited_items"
                                        WHERE "favorited_items".id IN (SELECT "favorited_items".id FROM "favorited_items"
                                            JOIN "favorited_outfits" ON favorited_items.favorited_outfit_id = favorited_outfits.id
                                            WHERE favorited_outfits.user_id = $1
                                            AND favorited_items.item_id = $2
                                            LIMIT 1
                                        );`


//                                         DELETE 
// FROM "favorited_items" B  
//      USING "favorited_outfits" C 
// WHERE B.favorited_outfit_id = C.id AND
//       C.user_id = $1 AND                 
//       B.item_id =$2;




    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        // Delete over items in "favorited_solo" first
        const resultsInSolo = await connection.query(sqlSearchText, [userId, itemId]);

        console.log('RESULTS IN SOLO!!!!', resultsInSolo)

        for (let i = 0; i < quantity; i++) {
            console.log('DELETING!!!')
            await connection.query(sqlDeleteFromSoloText, [userId, itemId]);
        }

        // If there's still more to delete
        if (quantity > resultsInSolo.rows.length) {
            for (let i = 0; i < (Number(quantity) - Number(resultsInSolo.rows.length)); i++) {
                console.log('DELETING TWO!!!!!!')
                await connection.query(sqlDeleteFromFaveItems, [userId, itemId]);
            }
        }


        await connection.query('COMMIT;');

        res.sendStatus(200);


    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in DELETE /api/favorites/items/decrease queries', error)
        res.sendStatus(500);
    } finally {
        connection.release();
    }

});

router.post('/items/increase', rejectUnauthenticated, async (req, res) => {
    const userId = req.user.id;
    const itemId = req.body.itemId;
    const quantity = req.body.qty;

    console.log('USER!', userId);
    console.log('ITEM!', itemId);
    console.log('QUANT!', quantity);

    const sqlInsertText = `INSERT INTO "favorited_solo"
                                ("user_id", "item_id")
                                VALUES
                                ($1, $2);`


    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        for (let i = 0; i < quantity; i++) {
            await connection.query(sqlInsertText, [userId, itemId]);
        }

        await connection.query('COMMIT;');

        res.sendStatus(201);


    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in DELETE /api/favorites/items/increase queries', error)
        res.sendStatus(500);
    } finally {
        connection.release();
    }

});

router.get('/item/sizes', rejectUnauthenticated, (req, res) => {

    const itemName = req.query.name;

    const sqlFetchText = `SELECT DISTINCT name, size FROM items
                            WHERE name = $1;`

    
    pool.query(sqlFetchText, [itemName])
        .then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log('Error in GET api/favorites/item/sizes:', error);
            res.sendStatus(500);
        });
}); 

router.get('/item/colors', rejectUnauthenticated, (req, res) => {

    const itemName = req.query.name;

    const sqlFetchText = `SELECT DISTINCT name, color FROM items
                            WHERE name = $1;`

    
    pool.query(sqlFetchText, [itemName])
        .then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.log('Error in GET api/favorites/item/colors:', error);
            res.sendStatus(500);
        });
}) ;


router.get('/occasions', (req, res) => {
    console.log('in GET /api/favorites/occasions');
    const sqlText = 'SELECT * FROM "occasions";';
    pool.query(sqlText)
        .then((dbRes) => {
            console.log('dbRes is:', dbRes.rows);
            res.send(dbRes.rows)
        }).catch(dbErr => {
            console.log('error in GET /api/favorites/occasions');
            res.sendStatus(500);
        })
});

router.get('/specific/favorite/item', rejectUnauthenticated, (req, res) => {

    const outfitId = req.query.outfitid;
    const itemId = req.query.itemid;
    
    const sqlFetchText = `SELECT items.*, COUNT(*) AS count FROM "favorited_items" 
	                        JOIN "favorited_outfits" ON "favorited_items".favorited_outfit_id = "favorited_outfits".id
	                        JOIN "items" ON "favorited_items".item_id = "items".id
	                            WHERE "favorited_outfits".outfit_id = $1
	                            AND "item_id" = $2
                                GROUP BY items.id;`

    pool.query(sqlFetchText, [outfitId, itemId])
        .then((response) => {
            res.send(response.rows)
        }).catch(error => {
            console.log('error in GET /api/favorites/specific/favorite/item', error);
            res.sendStatus(500);
        })   
});


 module.exports = router;
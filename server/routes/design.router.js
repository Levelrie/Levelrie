const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//  POST - Create Outfit
router.post('/outfit/create', rejectUnauthenticated, async (req, res) => {
	console.log('POST - Create Outfit', req.body);
	const name = req.body.name;
	const description = req.body.description;
	const occasion_id = req.body.occasion;
	const item_ids = req.body.item_ids;

	// const sqlOutfitCheck 

	const sqlCreateOutfit = `
		INSERT INTO "outfits" 
			("name", "description", "occasion_id")
			VALUES
				($1, $2, $3)
			RETURNING "id";`

	const sqlLinkOutfitItems = `
		INSERT INTO "outfit_items"
			("outfit_id", "item_id")
			VALUES
				($1, $2);`

	const connection = await pool.connect();
	
		try {

			await connection.query('BEGIN;');

			let outfit_id = await connection.query(sqlCreateOutfit, [name, description, occasion_id]);
			
			for (let i=0; i<item_ids.length; i++) {
				await connection.query(sqlLinkOutfitItems, [outfit_id.rows[0].id, item_ids[i]])
			}

			await connection.query('COMMIT;');

			res.sendStatus(201);
		}
		catch (error) { 
			await connection.query('ROLLBACK;');
			console.log('POST - Create Outfit error', error)
			res.sendStatus(500);
		}
		connection.release();
});

//  PUT - Edit Outfit
router.put('/outfit/edit/:id', (req, res) => {
	console.log('PUT - Edit Outfit', req.body);
  console.log('PUT - Outfit ID', req.params.id)
	// const sqlText = `
	// 	UPDATE "outfits"
	// 		SET "category_id" = $2, "description" = $3, "score" = $4
	// 		WHERE "id" = $1;
	// `;
  //   const sqlValues = [];
	// pool.query(sqlText, sqlValues)
	// 	.then((putOutfitRes) => {
	// 		res.sendStatus(201)
	// 	})
	// 	.catch((putOutfitErr) => {
	// 		console.log('Failed to Edit Outfit', putOutfitErr);
	// 		res.sendStatus(500);
	// 	});
});

//	DELETE - Delete Outfit
router.delete('/outfit/delete/:id', (req, res) => {
	console.log('DELETE - Delete Outfit', req.params.id);
	// const sqlText = `
	// 	DELETE FROM "outfits" 
	// 		WHERE id = $1;
	// `;
  //   const sqlValues = [req.params.id];
	// pool.query(sqlText, sqlValues)
	// 	.then((deleteOutfitRes) => {
	// 		res.sendStatus(201)
	// 	})
	// 	.catch((deleteOutfitErr) => {
	// 		console.log('Failed to Delete Outfit', deleteOutfitErr);
	// 		res.sendStatus(500);
	// 	});
});

//  POST - Create Item
router.post('/item/create', rejectUnauthenticated, (req, res) => {
	console.log('POST - Create Item', req.body);
	// const sqlText = `
  //       INSERT INTO 
	// `;
  //   const sqlValues = [];
	// pool.query(sqlText, sqlValues)
	// 	.then((postItemRes) => {
	// 		res.sendStatus(201)
	// 	})
	// 	.catch((postItemErr) => {
	// 		console.log('Failed to Create Item', postItemErr);
	// 		res.sendStatus(500);
	// 	});
});

//  PUT - Edit Item
router.put('/item/edit/:id', (req, res) => {
	console.log('PUT - Edit Item', req.body);
  console.log('PUT - Item ID', req.params.id)
	// const sqlText = `
	// 	UPDATE "items"
	// 		SET "category_id" = $2, "description" = $3, "score" = $4
	// 		WHERE "id" = $1;
	// `;
  //   const sqlValues = [];
	// pool.query(sqlText, sqlValues)
	// 	.then((putItemRes) => {
	// 		res.sendStatus(201)
	// 	})
	// 	.catch((putItemErr) => {
	// 		console.log('Failed to Edit Item', putItemErr);
	// 		res.sendStatus(500);
	// 	});
});

//	DELETE - Delete Item
router.delete('/item/delete/:id', (req, res) => {
	console.log('DELETE - Delete Item', req.params.id);
	// const sqlText = `
	// 	DELETE FROM "items" 
	// 		WHERE id = $1;
	// `;
  //   const sqlValues = [req.params.id];
	// pool.query(sqlText, sqlValues)
	// 	.then((deleteItemRes) => {
	// 		res.sendStatus(201)
	// 	})
	// 	.catch((deleteItemErr) => {
	// 		console.log('Failed to Delete Item', deleteItemErr);
	// 		res.sendStatus(500);
	// 	});
});

module.exports = router;
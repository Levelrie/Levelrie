const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//	GET - Outfits
router.get('/outfits', rejectUnauthenticated, (req, res) => {
	console.log('Did I make to the OUTFITS GET ROUTE?');
	const sqlOutfits = `
		SELECT * FROM outfits
			ORDER BY outfits.name;`
	pool.query(sqlOutfits)
		.then((results) => {
			let outfits = results.rows;
			console.log('Outfits:', outfits);
			res.send(outfits);
		})
		.catch((error) => {
			console.log('GET - Outfits error', error)
			res.sendStatus(500);
		});
});

//  POST - Create Outfit
router.post('/outfit/create', rejectUnauthenticated, async (req, res) => {
	console.log('POST - Create Outfit', req.body);
	const name = req.body.name;
	const description = req.body.description;
	const occasion_id = req.body.occasion;
	const item_ids = req.body.item_ids;
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
router.put('/outfit/edit/:id', async (req, res) => {
	console.log('PUT - Edit Outfit', req.body);
  console.log('PUT - Outfit ID', req.params.id)
	const id = req.params.id;
	const description = req.body.description;
	const occasion_id = req.body.occasion;
	const item_ids = req.body.item_ids;
	const sqlDeleteOutfitItems = `
		DELETE FROM outfit_items
			WHERE outfit_items.outfit_id = $1;`
	const sqlEditOutfitItems = `
		INSERT INTO outfit_items
			("outfit_id", "item_id")
			VALUES
				($1, $2);`
	const sqlEditOutfit = `
		UPDATE outfits
			SET "description" = $2, "occasion_id" = $3
			WHERE id = $1;`
	const connection = await pool.connect();
		try {
			await connection.query('BEGIN;');
			await connection.query(sqlDeleteOutfitItems, [id]);
			for (let i=0; i<item_ids.length; i++) {
				await connection.query(sqlEditOutfitItems, [id, item_ids[i]])
			}
			await connection.query(sqlEditOutfit, [id, description, occasion_id])
			await connection.query('COMMIT;');
			res.sendStatus(201);
		}
		catch (error) { 
			await connection.query('ROLLBACK;');
			console.log('PUT - Edit Outfit error', error)
			res.sendStatus(500);
		}
		connection.release();
});

//	DELETE - Delete Outfit
router.delete('/outfit/delete/:id', async (req, res) => {
	console.log('DELETE - Delete Outfit', req.params.id);
	const sqlValues = [req.params.id];
	const sqlOutfitItems = `
		DELETE FROM outfit_items
			WHERE outfit_items.outfit_id = $1;
	`;
	const sqlOutfits = `
		DELETE FROM outfits
			WHERE outfits.id = $1;
	`;
	const connection = await pool.connect();
		try {
			await connection.query('BEGIN;');
			await connection.query(sqlOutfitItems, sqlValues);
			await connection.query(sqlOutfits, sqlValues)
			await connection.query('COMMIT;');
			res.sendStatus(201);
		}
		catch (error) { 
			await connection.query('ROLLBACK;');
			console.log('Failed to Delete Outfit', error)
			res.sendStatus(500);
		}
		connection.release();
});

//	GET - Outerwear
router.get('/outerwear/:id', rejectUnauthenticated, (req, res) => {
	const outfit_id = [req.params.id];
	const sqlOuterwear = `
		SELECT items.id, items.name, items.img FROM items
			JOIN "outfit_items" ON items.id = outfit_items.item_id
			WHERE outfit_items.outfit_id = $1
			AND items.category_id = '6';`
	pool.query(sqlOuterwear, outfit_id)
		.then((results) => {
			let outerwear = results.rows;
			console.log('Outerwear:', outerwear);
			res.send(outerwear);
		})
		.catch((error) => {
			console.log('GET - Outerwear error', error)
			res.sendStatus(500);
		});
});

//	GET - Top
router.get('/top/:id', rejectUnauthenticated, (req, res) => {
	const outfit_id = [req.params.id];
	const sqlTop = `
		SELECT items.id, items.name, items.img FROM items
			JOIN "outfit_items" ON items.id = outfit_items.item_id
			WHERE outfit_items.outfit_id = $1
			AND items.category_id = '1';`
	pool.query(sqlTop, outfit_id)
		.then((results) => {
			let top = results.rows;
			console.log('Top:', top);
			res.send(top);
		})
		.catch((error) => {
			console.log('GET - Top error', error)
			res.sendStatus(500);
		});
});

//	GET - Accessory
router.get('/accessory/:id', rejectUnauthenticated, (req, res) => {
	const outfit_id = [req.params.id];
	const sqlAccessory = `
		SELECT items.id, items.name, items.img FROM items
			JOIN "outfit_items" ON items.id = outfit_items.item_id
			WHERE outfit_items.outfit_id = $1
			AND items.category_id = '7';`
	pool.query(sqlAccessory, outfit_id)
		.then((results) => {
			let accessory = results.rows;
			console.log('Accessory:', accessory);
			res.send(accessory);
		})
		.catch((error) => {
			console.log('GET - Accessory error', error)
			res.sendStatus(500);
		});
});

//	GET - Bottom
router.get('/bottom/:id', rejectUnauthenticated, (req, res) => {
	const outfit_id = [req.params.id];
	const sqlBottom = `
		SELECT items.id, items.name, items.img FROM items
			JOIN "outfit_items" ON items.id = outfit_items.item_id
			WHERE outfit_items.outfit_id = $1
			AND items.category_id = '2';`
	pool.query(sqlBottom, outfit_id)
		.then((results) => {
			let bottom = results.rows;
			console.log('Bottom:', bottom);
			res.send(bottom);
		})
		.catch((error) => {
			console.log('GET - Bottom error', error)
			res.sendStatus(500);
		});
});

//	GET - Footwear
router.get('/footwear/:id', rejectUnauthenticated, (req, res) => {
	const outfit_id = [req.params.id];
	const sqlFootwear = `
		SELECT items.id, items.name, items.img FROM items
			JOIN "outfit_items" ON items.id = outfit_items.item_id
			WHERE outfit_items.outfit_id = $1
			AND items.category_id = '3';`
	pool.query(sqlFootwear, outfit_id)
		.then((results) => {
			let footwear = results.rows;
			console.log('Footwear:', footwear);
			res.send(footwear);
		})
		.catch((error) => {
			console.log('GET - Footwear error', error)
			res.sendStatus(500);
		});
});

module.exports = router;
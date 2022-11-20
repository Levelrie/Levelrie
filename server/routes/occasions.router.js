const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// •••••••••••••••••••••••••••••••••••••••• FETCH OCCASIONS ROUTE BELOW ••••••••••••••••••••••••••••••••••••••••

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('GET - Occasions');
    const sqlFetchText = `SELECT * FROM "occasions"
        ORDER BY id
        ;`
    pool.query(sqlFetchText)
    .then((results) => {
        res.send(results.rows);
    })
    .catch((error) => {
        console.log('GET - Occasions error', error);
        res.sendStatus(500);
    });
});

module.exports = router;
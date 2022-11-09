const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');
const itemRouter = require('./routes/item.router');
const outfitRouter = require('./routes/outfit.router');
const cartRouter = require('./routes/cart.router');
const favoritesRouter = require('./routes/favorites.router');
const closetRouter = require('./routes/closet.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/item', itemRouter);
app.use('/api/outfit', outfitRouter);
app.use('/api/cart', cartRouter);
app.use('/api/favorites/outfits', favoritesRouter);
app.use('/api/closet/oufits', closetRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

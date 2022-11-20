const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
// const adminRouter = require('./routes/admin.router');
const itemRouter = require('./routes/item.router');
const outfitRouter = require('./routes/outfit.router');
const cartRouter = require('./routes/cart.router');
const favoritesRouter = require('./routes/favorites.router');
const closetOutfitRouter = require('./routes/closetOutfit.router');
const closetItemRouter = require('./routes/closetItem.router');
const closetRouter = require('./routes/closet.router');
const shippingRouter = require('./routes/shipping.router');
const designRouter = require('./routes/design.router');
const occasionsRouter = require('./routes/occasions.router');
const orderRouter = require('./routes/order.router')

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
// app.use('/api/admin', adminRouter);
app.use('/api/item', itemRouter);
app.use('/api/outfit', outfitRouter);
app.use('/api/cart', cartRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/closet/outfits', closetOutfitRouter);
app.use('/api/closet/items', closetItemRouter);
app.use('/api/closet', closetRouter);
app.use('/api/shipping', shippingRouter);
app.use('/api/design', designRouter);
app.use('/api/occasions', occasionsRouter);
app.use('/api/buy', orderRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

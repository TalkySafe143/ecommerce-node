// Express
const express = require('express');
const app = express();

// Helmet
const helmet = require('helmet');

// cors
const cors = require('cors');

// routes
const productsRoute = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const authAPIRouter = require('./routes/api/auth')
const path = require('path');
const middlewares = require('./utils/middleware/errors')

// Express parser & helmet headers
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Template Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

// Path's handles
app.use('/products', productsRoute)
productsApiRouter(app);
app.use('/api/auth', authAPIRouter)
// Redirect
app.get('/', (req, res, next) => {
    res.redirect('/products')
})

// Middlewares: Error-Handlers
app.use(middlewares.logErrors);
app.use(middlewares.clientErrors);
app.use(middlewares.errorHandler);

const server = app.listen(3000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});

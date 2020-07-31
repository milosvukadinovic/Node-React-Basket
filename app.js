var express = require('express');
var bodyParser = require('body-parser');
var productsHandler = require('./server/endpoints/products');
var checkoutHandler = require('./server/endpoints/checkout');
var promocodeHandler = require('./server/endpoints/promocode');

var PORT = 9001; // server port
var app = express(); // express app

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/www`));

// api routes
app.get('/api/products', productsHandler);
app.post('/api/promocode', promocodeHandler);
app.post('/api/checkout', checkoutHandler);

// catch-all to support client-side routing
app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/www/index.html`);
});

var server = app.listen(PORT, () => {
    console.log(`\n * STARTING Node Server * [Port: ${server.address().port}]\n`);
});

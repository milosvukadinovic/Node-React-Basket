const products = require('../products.json')

module.exports = function (req, res) {
    res.json(products);
};

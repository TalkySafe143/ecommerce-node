const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/product');
const config = require('../../config');

// cache
const cacheResponse = require('../../utils/cacheResponse');

const productsMock = new ProductsService();

router.get('/', async (req, res, next) => {
    cacheResponse(res, 300);

    const { tags } = req.query;

    try {
        const products = await productsMock.getProducts({ tags });
        res.render('products', { products, dev: config.dev });
    } catch(err) {
        next(err);
    }

});

module.exports = router;
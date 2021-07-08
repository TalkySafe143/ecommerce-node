const express = require('express')
const passport = require('passport');
const ProductsService = require('../../services/product');
const productLib = new ProductsService();
const { productIdSchema, productTagsSchema, createProductSchema, updateProductSchema } = require('../../utils/schemas/product');
const validationHandler = require('../../utils/middleware/validation');
const cacheResponse = require('../../utils/cacheResponse');
require('../../utils/auth/strategies/jwt');

function productsAPIRouter(app) {
    const router = express.Router();

    app.use('/api/products', router);

    router.get('/', async (req, res, next) => {
        cacheResponse(res, 300);

        const { tags } = req.query;
    
        try {
            const products = await productLib.getProducts({ tags })
    
            res.status(200).json({
                data: products,
                message: 'Products listed'
            })
        } catch(err) {
            next(err);
        }
        
    });
    
    router.get('/:productId', validationHandler(productIdSchema, 'params'),async (req, res, next) => {
        cacheResponse(res, 3600)

        const { productId } = req.params;
    
        try {
            const product = await productLib.getProduct({ productId });
    
            res.status(200).json({
                data: product,
                message: 'Products retrieved'
            })
        } catch(err) {
            next(err);
        }
    
    });
    
    router.post('/', validationHandler(createProductSchema, 'body'), async (req, res, next) => {
        try {
            const product = await productLib.createProduct({ product: req.body }); 
    
            res.status(201).json({
                data: product.ops[0]._id,
                message: 'Product created'
            })
        } catch(err) {
            next(err);
        }
    
    });
    
    router.put('/:productId', passport.authenticate('jwt', { session: false }) ,validationHandler(productIdSchema, 'params'), validationHandler(updateProductSchema, 'body'), async (req, res, next) => {
        const { productId } = req.params;
    
        try {
            await productLib.updateProduct({ productId, product: req.body }) 
    
            res.status(200).json({
                data: 'The product has been updated!',
                message: 'Products updated'
            })
        } catch(err) {
            next(err);
        }
    
    });
    
    router.delete('/:productId', passport.authenticate('jwt', { session: false }) ,validationHandler(productIdSchema, 'params'), async (req, res, next) => {
        const { productId } = req.params;
    
        try {
            await productLib.deleteProduct({ productId }) 
    
            res.status(200).json({
                data: 'Se ha eliminado el producto correctamente',
                message: 'Products deleted'
            })
        } catch(err) {
            next(err);
        }
    
    });
    
    router.patch('/:productId', validationHandler(productIdSchema, 'params'), validationHandler(updateProductSchema, 'body'), async (req, res, next) => {
        const { productId } = req.params;
    
        try {
            await productLib.patchProduct({ productId, product: req.body }) 
    
            res.status(200).json({
                data: 'The product has been updated!',
                message: 'Products updated'
            })
        } catch(err) {
            next(err);
        }
    
    });
}

module.exports = productsAPIRouter;
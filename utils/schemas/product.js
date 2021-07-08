const Joi = require('joi');

const productIdSchema = Joi.object({ productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/) });

const productTagsSchema = Joi.array().items(Joi.string().max(10));

const createProductSchema = Joi.object({
    name: Joi.string().max(50).required(),
    price: Joi.number().min(1).max(10000000).required(),
    image: Joi.string().required(),
    tags: productTagsSchema
})

const updateProductSchema = Joi.object({
    name: Joi.string().max(50),
    price: Joi.number().min(1).max(10000000),
    image: Joi.string(),
    tags: productTagsSchema
})

module.exports = { productTagsSchema, productIdSchema, createProductSchema, updateProductSchema }
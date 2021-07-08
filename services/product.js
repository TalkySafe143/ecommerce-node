const productsMock = require('../utils/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductsService {
    constructor(){
        this.collection = 'products';
        this.mongoDB = new MongoLib();
    }

    getProducts({ tags }) {
        return new Promise(async (resolve, reject) => {

            try {
                const query = tags ? { tags: { $in: tags } } : '';
                const products = await this.mongoDB.getAll(this.collection, query)
                resolve(products || []);
            } catch(err) {
                console.log(err)
                reject('Internal Error');
            }

        })
    }

    getProduct({ productId }) {
        return new Promise(async (resolve, reject) => {
            
            try {
                const product = await this.mongoDB.get(this.collection, productId);
                resolve(product || '')
            } catch(err) {
                console.log(err);
                reject(err)
            }

        })
    }

    createProduct({ product }) {
        return new Promise(async (resolve, reject) => {
            
            try {
                const createdProduct = await this.mongoDB.create(this.collection, product);
                resolve(createdProduct);
            } catch(err) {
                console.log(err)
                reject('Internal error');
            }

        })
    }

    updateProduct({ productId, product }) {
        return new Promise(async (resolve, reject) => {
            
            try {
                const updatedProduct = await this.mongoDB.update(this.collection, productId, product);
                resolve(updatedProduct); 
            } catch(err) {
                console.log(err);
                reject('Internal error')
            }

        })
    }

    deleteProduct({ productId }) {
        return new Promise( async (resolve, reject) => {
            
            try {
                const deletedProduct = await this.mongoDB.delete(this.collection, productId);
                resolve(deletedProduct); 
            } catch(err) {
                console.log(err);
                reject('Internal Error')
            }

        })
    }

    patchProduct({ productId, product }) {
        return new Promise(async (resolve, reject) => {
            if (!product.name && !product.price) reject('No hay nada para cambiar')
            
            try {
                const patchedProduct = await this.mongoDB.update(this.collection, productId, product);
                resolve(patchedProduct); 
            } catch(err) {
                console.log(err)
                reject('Internal error')
            }
        })
    }
}

module.exports = ProductsService;
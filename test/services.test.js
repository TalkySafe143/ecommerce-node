const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub, createStub } = require('../utils/mocks/mongolib');
const { productsMock, filteredProductsMock } = require('../utils/mocks/products');

describe("service - products", () => {
    const ProductsService = proxyquire('../services/product.js', {
        '../lib/mongo': MongoLibMock
    })

    const productsService = new ProductsService();

    describe("When getProducts method is called", async () => {
        it(" should call the method getAll MongoLib method", async () => {
            await productsService.getProducts({});
            assert.strictEqual(getAllStub.called, true);
        })
        it("should return an array of products", async function() {
            const result = await productsService.getProducts({});
            const expected = productsMock;
            assert.deepStrictEqual(result, expected);
        })
    });

    describe("when getProducts method is called with tags", async function() {
        it("should all the getAll MongoLib method with tags args", async function() {
          await productsService.getProducts({ tags: ["expensive"] });
          const tagQuery = { tags: { $in: ["expensive"] } };
          assert.strictEqual(getAllStub.calledWith("products", tagQuery), true);
        });
    
        it("should return an array of products filtered by the tag", async function() {
          const result = await productsService.getProducts({ tags: ["expensive"] });
          const expected = filteredProductsMock("expensive");
          assert.deepEqual(result, expected);
        });
      });
})
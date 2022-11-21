const { expect } = require('chai');
const { it, describe, afterEach } = require('mocha');
const sinon = require('sinon');

const model = require('../../../src/models/productModel');
const connection = require('../../../src/models/connection');
const mock = require('../../../__tests__/_dataMock')

describe('testando o model', () => {

  afterEach(function () {
    sinon.restore();
  });

  it("testando getAllProducts", async () => {
    sinon.stub(connection, 'execute').resolves([
      mock.allProductsResponse
    ]);

    const products = await model.getAllProducts();
    expect(products).to.deep.equal(mock.allProductsResponse)
  });

  it("testando getProductFromID", async() => {
    sinon.stub(connection, 'execute').resolves([
      {id:1 , name: 'xablau'}
    ])

    const product = await model.getProductFromID(1)
    expect(product).to.deep.equal({ id: 1, name: "xablau" });
  });

  it("testando insertProducts e productInserteds", async () => {
    sinon.stub(connection, "execute").resolves([
      { id: 1, name: "xablau" }
    ]);

    const name = await model.insertProducts({ id: 1, name: "xablau" });
    expect(name).to.be.equal('xablau');

    const product = await model.productInserteds();
    expect(product).to.deep.equal({ id: 1, name: "xablau" });
  });

})
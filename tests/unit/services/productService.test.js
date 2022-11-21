const { expect } = require("chai");
const { it, describe, afterEach } = require("mocha");
const sinon = require("sinon");

const service = require("../../../src/services/productService");
const connection = require("../../../src/models/connection");
const mock = require("../../../__tests__/_dataMock");

describe("testando o service", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("testando getAllProducts", async () => {
    sinon.stub(connection, "execute").resolves([mock.allProductsResponse]);

    const products = await service.getAllProducts();
    expect(products).to.deep.equal(mock.allProductsResponse);
  });

  it("testando getProductFromID", async () => {
    sinon.stub(connection, "execute").resolves([{ id: 1, name: "xablau" }]);

    const product = await service.getProductFromID(1);
    expect(product).to.deep.equal({ id: 1, name: "xablau" });
  });

  it("testando insertProducts e productInserteds", async () => {
    sinon.stub(connection, "execute").resolves([
      [{ id: 1, name: "xablau" }]
    ]);

    const product = await service.insertProducts({ id: 1, name: "xablau" });
    expect(product).to.deep.equal({ id: 1, name: "xablau" });
  });

  it("testando falhas", async () => {
    sinon.stub(connection, "execute").resolves([undefined]);

    const products = await service.getAllProducts();
    expect(products).to.deep.equal([]);
    const product = await service.getProductFromID();
    expect(product).to.deep.equal([]);
    const newProduct = await service.insertProducts({ id: 1, name: "xablau" });
    expect(newProduct).to.deep.equal([]);
  });
});

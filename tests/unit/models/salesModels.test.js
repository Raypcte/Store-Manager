const { expect } = require('chai');
const { it, describe, afterEach } = require('mocha');
const sinon = require('sinon');

const model = require('../../../src/models/modelSales');
const connection = require('../../../src/models/connection');
const allSales = [
  {
    "sale_id": 1,
    "product_id": 1,
    "quantity": 5,
    "date": "2022-11-29T05:11:52.000Z"
  },
  {
    "sale_id": 2,
    "product_id": 3,
    "quantity": 15,
    "date": "2022-11-29T05:11:52.000Z"
  }
];
const saleId = [
  {
    "product_id": 1,
    "quantity": 5,
    "date": "2022-11-29T05:11:52.000Z"
  }
]
const createdId = {
  insertId: 1,
}
const createdSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

describe('testando o model', () => {

  afterEach(function () {
    sinon.restore();
  });

  it("testando getAllSales", async () => {
    sinon.stub(connection, 'execute').resolves([
      allSales,
    ]);

    const sales = await model.getAllSales();
    expect(sales).to.deep.equal([
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: '2022-11-29T05:11:52.000Z'
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: '2022-11-29T05:11:52.000Z'
      }
    ])
  });

  it("testando getSaleFromID", async() => {
    sinon.stub(connection, 'execute').resolves([
      saleId,
    ])

    const sale = await model.getSalesFromID(1)
    expect(sale).to.deep.equal([
      {
        "productId": 1,
        "quantity": 5,
        "date": "2022-11-29T05:11:52.000Z"
      }
    ]);
  });

  it("testando insertSales", async () => {
    sinon.stub(connection, "execute")
    .onFirstCall()
    .resolves([
      createdId,
    ])
    .onSecondCall()
    .resolves([
      createdSale,
    ])

    const sale = await model.createSales([
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]);
    expect(sale).to.deep.equal({
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    });
  });

})
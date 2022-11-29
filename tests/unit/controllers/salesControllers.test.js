const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinonChai = require("sinon-chai");
const { it, describe, afterEach } = require("mocha");
const { expect } = chai;

chai.use(sinonChai);
chai.use(chaiHttp);

const app = require("../../../src/app");

const connection = require("../../../src/models/connection");
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

describe("testando o controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("testando get /sales", function (done) {
    sinon
      .stub(connection, "execute")
      .resolves([allSales])

    chai.request(app).get("/sales")
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal([
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
        ]);
        done();
      })
  }).timeout(10000);

  it("testando get /sales/:id", function (done) {
    sinon
      .stub(connection, "execute")
      .resolves([saleId]);

    chai
      .request(app)
      .get("/sales/1")
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal([
          {
            "productId": 1,
            "quantity": 5,
            "date": "2022-11-29T05:11:52.000Z"
          }
        ]);
        done();
      });
  }).timeout(10000);

  it("testando post /sales", function (done) {
    sinon.stub(connection, "execute")
    .onFirstCall()
    .resolves([
      [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ]
    ])
    .onSecondCall()
    .resolves([
      createdId,
    ])
    .onThirdCall()
    .resolves([
      createdSale,
    ]);

    chai
      .request(app)
      .post("/sales")
      .send([
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ])
      .then((response) => {
        expect(response.status).to.be.equal(201);
        console.log(response.body, 'retornooo')
        expect(response.body).to.deep.equal({
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
        done();
      });
  }).timeout(10000);

});

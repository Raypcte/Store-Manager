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
const mock = require("../../../__tests__/_dataMock");

describe("testando o controller", () => {
  afterEach(function () {
    sinon.restore();
  });

  it("testando get /products", function (done) {
    sinon
      .stub(connection, "execute")
      .resolves([mock.allProductsResponse])

    chai.request(app).get("/products")
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(mock.allProductsResponse);
        done();
      })
  }).timeout(10000);

  it("testando get /products/:id", function (done) {
    sinon
      .stub(connection, "execute")
      .resolves([mock.productSearchNameResponse]);

    chai
      .request(app)
      .get("/products/1")
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(mock.productSearchNameResponse[0]);
        done();
      });
  }).timeout(10000);

  it("testando post /products", function (done) {
    sinon.stub(connection, "execute").resolves([[{ name: "xablau" }]]);

    chai
      .request(app)
      .post("/products")
      .send({
        name: "xablau",
      })
      .then((response) => {
        expect(response.status).to.be.equal(201);
        expect(response.body).to.deep.equal({ name: "xablau" });
        done();
      });
  }).timeout(10000);

});

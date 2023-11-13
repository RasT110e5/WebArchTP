/**
 * The ProductsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ProductsService');
const findAllProducts = async (request, response) => {
  await Controller.handleRequest(request, response, service.findAllProducts);
};

const createANewProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.createANewProduct);
};

const deleteAProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteAProduct);
};

const getASpecificProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.getASpecificProduct);
};

const modifyAProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.modifyAProduct);
};

const searchProductsByModelAndAliases = async (request, response) => {
  await Controller.handleRequest(request, response, service.searchProductsByModelAndAliases);
};


module.exports = {
  findAllProducts,
  createANewProduct,
  deleteAProduct,
  getASpecificProduct,
  modifyAProduct,
  searchProductsByModelAndAliases,
};

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

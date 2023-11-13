const Controller = require('./Controller');
const service = require('../services/AliasesService');
const mapAliasToProduct = async (request, response) => {
  await Controller.handleRequest(request, response, service.mapAliasToProduct);
};

const findAllAliases = async (request, response) => {
  await Controller.handleRequest(request, response, service.findAllAliases);
};

const searchProductByAlias = async (request, response) => {
  await Controller.handleRequest(request, response, service.searchProductByAlias);
};


module.exports = {
  mapAliasToProduct,
  findAllAliases,
  searchProductByAlias,
};

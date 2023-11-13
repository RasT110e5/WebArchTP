const Controller = require('./Controller');
const service = require('../services/CategoriesService');
const deleteACategory = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteACategory);
};

const modifyACategory = async (request, response) => {
  await Controller.handleRequest(request, response, service.modifyACategory);
};

const findAllCategories = async (request, response) => {
  await Controller.handleRequest(request, response, service.findAllCategories);
};

const createNewCategory = async (request, response) => {
  await Controller.handleRequest(request, response, service.createNewCategory);
};


module.exports = {
  deleteACategory,
  modifyACategory,
  findAllCategories,
  createNewCategory,
};

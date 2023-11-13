const Controller = require('./Controller');
const service = require('../services/TagsService');

const findAllTags = async (request, response) => {
  await Controller.handleRequest(request, response, service.findAllTags);
};

module.exports = {
  findAllTags,
};

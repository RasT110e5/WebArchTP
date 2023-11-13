const Service = require('./Service');
const productService = require('./ProductsService')

const findAllTags = () => new Promise(
  async (resolve, reject) => {
    let products = productService.findAll();
    let tags = new Set(products.flatMap(product => product.taggedBy));
    resolve(Service.successResponse([...tags]));
  },
);

module.exports = {
  findAllTags,
};

const Service = require('./Service');

/**
 * Find all products
 *
 * returns List
 * */
const findAllProducts = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
 * Creates a new product
 *
 * modifyProductDto ModifyProductDto  (optional)
 * returns Product
 * */
const createANewProduct = ({modifyProductDto}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        modifyProductDto,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
 * Delete a product
 *
 * productId Integer ID of the product to be deleted
 * no response value expected for this operation
 * */
const deleteAProduct = ({productId}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
 * Get a specific product
 *
 * productId Integer The ID of the product to get
 * returns Product
 * */
const getASpecificProduct = ({productId}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
 * Modify a product.
 *
 * productId Integer ID of the product to be deleted
 * modifyProductDto ModifyProductDto  (optional)
 * returns Product
 * */
const modifyAProduct = ({productId, modifyProductDto}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        productId,
        modifyProductDto,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
 * Search products by model name and aliases
 *
 * query String Query string to search by (optional)
 * returns List
 * */
const searchProductsByModelAndAliases = ({query}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        query,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  findAllProducts,
  createANewProduct,
  deleteAProduct,
  getASpecificProduct,
  modifyAProduct,
  searchProductsByModelAndAliases,
};

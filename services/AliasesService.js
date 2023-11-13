/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Map an alias to a product
 *
 * aliasName String The name of the alias to map
 * productId Integer The product id to mapped this alias to (optional)
 * returns Alias
 * */
const mapAliasToProduct = ({aliasName, productId}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        aliasName,
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
 * Find all product aliases
 *
 * mappedOnly Boolean Flag to filter and bring only aliases mapped to a product (optional)
 * returns List
 * */
const findAllAliases = ({mappedOnly}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse([]));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
 * Find a product by alias only and create the alias if a product is not found
 *
 * alias String Alias to search by (optional)
 * returns Product
 * */
const searchProductByAlias = ({alias}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        alias,
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
  mapAliasToProduct,
  findAllAliases,
  searchProductByAlias,
};

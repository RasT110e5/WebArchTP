/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Find all products
*
* returns List
* */
const productsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
* Creates a new product
*
* modifyProductDto ModifyProductDto  (optional)
* returns Product
* */
const productsPOST = ({ modifyProductDto }) => new Promise(
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
const productsProductIdDELETE = ({ productId }) => new Promise(
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
const productsProductIdGET = ({ productId }) => new Promise(
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
const productsProductIdPUT = ({ productId, modifyProductDto }) => new Promise(
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
const productsSearchGET = ({ query }) => new Promise(
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
  productsGET,
  productsPOST,
  productsProductIdDELETE,
  productsProductIdGET,
  productsProductIdPUT,
  productsSearchGET,
};

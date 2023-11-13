/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Delete a category
 *
 * categoryName String Name of the category to be deleted
 * no response value expected for this operation
 * */
const deleteACategory = ({categoryName}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        categoryName,
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
 * Modify a category
 *
 * categoryName String The category name that will change its parent category
 * modifyParentCategoryDto ModifyParentCategoryDto  (optional)
 * returns Category
 * */
const modifyACategory = ({categoryName, modifyParentCategoryDto}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        categoryName,
        modifyParentCategoryDto,
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
 * Find all categories
 *
 * returns List
 * */
const findAllCategories = () => new Promise(
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
 * Creates a new category
 *
 * createCategoryDto CreateCategoryDto  (optional)
 * no response value expected for this operation
 * */
const createNewCategory = ({createCategoryDto}) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        createCategoryDto,
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
  deleteACategory,
  modifyACategory,
  findAllCategories,
  createNewCategory,
};

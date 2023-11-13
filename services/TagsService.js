const Service = require('./Service');

/**
 * Collect all tags from available products
 *
 * returns List
 * */
const findAllTags = () => new Promise(
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

module.exports = {
  findAllTags,
};

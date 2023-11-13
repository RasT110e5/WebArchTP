const Service = require('./Service');

const categoriesArray = [
  {
    "parentCategory": "Wooden",
    "name": "Small"
  },
  {
    "parentCategory": "Steel",
    "name": "Bespoke"
  },
  {
    "parentCategory": "Frozen",
    "name": "Food"
  },
  {
    "name": "Wooden",
    "parentCategory": null
  },
  {
    "name": "Steel",
    "parentCategory": null
  },
  {
    "name": "Clothes",
    "parentCategory": null
  },
  {
    "name": "Frozen",
    "parentCategory": null
  },
  {
    "name": "Bath",
    "parentCategory": null
  }
]
const categoriesPersisted = new Map()
categoriesArray.forEach(category => categoriesPersisted.set(category.name, category))

const deleteACategory = ({categoryName}) => new Promise(
  async (resolve, reject) => {
    if (categoryExists(categoryName)) {
      categoriesPersisted.delete(categoryName)
      resolve(Service.emptySuccessResponse());
    } else
      reject(Service.badRequestResponse(`Category with name ${categoryName} does not exist`))
  },
);

const modifyACategory = ({categoryName, body}) => new Promise(
  async (resolve, reject) => {
    if (!categoryExists(categoryName))
      reject(Service.badRequestResponse(`Category with name ${categoryName} does not exist`))
    else {
      if (!categoryExists(body.parentCategory))
        reject(Service.badRequestResponse(`Parent Category with name ${body.parentCategory} does not exist`))
      else {
        let categoryToModify = categoriesPersisted.get(categoryName)
        categoryToModify.parentCategory = body.parentCategory
        resolve(Service.successResponse({categoryToModify}));
      }
    }
  },
);

const findAllCategories = () => new Promise(
  async (resolve, reject) => {
    resolve(Service.successResponse([...categoriesPersisted.values()]));
  },
);

const createNewCategory = ({body}) => new Promise(
  async (resolve, reject) => {
    if (categoryExists(body.name))
      reject(Service.badRequestResponse(`Category with name ${body.name} already exists`))
    else {
      if (body.parentCategory !== undefined && !categoryExists(body.parentCategory)) {
        reject(Service.badRequestResponse(`Parent Category with name ${body.name} does not exist`))
      } else {
        let newCategory = saveNewCategory(body);
        resolve(Service.createdResponse({newCategory}));
      }
    }
  },
);

function categoryExists(name) {
  return categoriesPersisted.has(name)
}

function saveNewCategory(body) {
  let newCategory = {
    name: body.name,
    parentCategory: body.parentCategory || null
  }
  categoriesPersisted.set(newCategory.name, newCategory)
  return newCategory;
}

module.exports = {
  deleteACategory,
  modifyACategory,
  findAllCategories,
  createNewCategory,
};

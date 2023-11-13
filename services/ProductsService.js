const Service = require('./Service');
const categoryService = require('./CategoriesService')

const productArray = [
  {
    "id": 10,
    "marketPrice": 177.00,
    "creator": "Tanya Abbott",
    "aliases": [
      "Elegant Frozen Tuna",
      "Rustic Fresh Ball"
    ],
    "weight": 478.00,
    "model": "Tuna",
    "taggedBy": [
      "New"
    ],
    "category": "Food",
    "type": "Fantastic"
  },
  {
    "id": 11,
    "marketPrice": 579.00,
    "creator": "Miguel Waelchi",
    "aliases": [],
    "weight": 831.00,
    "model": "Pants",
    "taggedBy": [
      "New"
    ],
    "category": "Clothes",
    "type": "Awesome"
  },
  {
    "id": 12,
    "marketPrice": 198.00,
    "creator": "Mary Breitenberg",
    "aliases": [],
    "weight": 379.00,
    "model": "Table",
    "taggedBy": [
      "Fancy",
      "Unique"
    ],
    "category": "Small",
    "type": "Oriental"
  },
  {
    "id": 13,
    "marketPrice": 94.00,
    "creator": "Betsy Steuber",
    "aliases": [],
    "weight": 773.00,
    "model": "Towels",
    "taggedBy": [
      "On-Sale",
      "Excellent Quality"
    ],
    "category": "Bath",
    "type": "Incredible"
  },
  {
    "id": 14,
    "marketPrice": 275.00,
    "creator": "Mercedes Conroy Jr.",
    "aliases": [],
    "weight": 874.00,
    "model": "Bike",
    "taggedBy": [
      "Monthly Payment"
    ],
    "category": "Steel",
    "type": "Rustic"
  },
  {
    "id": 15,
    "marketPrice": 319.00,
    "creator": "Cody Kilback",
    "aliases": [],
    "weight": 706.00,
    "model": "Chair",
    "taggedBy": [],
    "category": "Wooden",
    "type": "Elegant"
  },
  {
    "id": 16,
    "marketPrice": 719.00,
    "creator": "Clayton Bradtke",
    "aliases": [
      "Fantastic Rubber Shoes"
    ],
    "weight": 353.00,
    "model": "Shoes",
    "taggedBy": [],
    "category": "Clothes",
    "type": "Tasty"
  },
  {
    "id": 17,
    "marketPrice": 76.00,
    "creator": "Juan D'Amore",
    "aliases": [],
    "weight": 951.00,
    "model": "Sausages",
    "taggedBy": [
      "Not-Meat"
    ],
    "category": "Frozen",
    "type": "Refined"
  },
  {
    "id": 18,
    "marketPrice": 460.00,
    "creator": "Mrs. Susie Pollich",
    "aliases": [],
    "weight": 224.00,
    "model": "Shirt",
    "taggedBy": [
      "Luxury"
    ],
    "category": "Clothes",
    "type": "Bespoke"
  },
  {
    "id": 19,
    "marketPrice": 417.00,
    "creator": "Shirley Schmitt",
    "aliases": [],
    "weight": 272.00,
    "model": "Chips",
    "taggedBy": [
      "Vegan"
    ],
    "category": "Food",
    "type": "Electronic"
  }
]

const persistedProducts = new Map()
productArray.forEach(product => persistedProducts.set(product.id, product))

const findAllProducts = ({tag}) => new Promise(
  async (resolve, reject) => {
    if (tag !== undefined)
      resolve(Service.successResponse(findAll().filter(product => product.taggedBy.includes(tag))));
    else
      resolve(Service.successResponse(findAll()));
  },
);

const createANewProduct = ({body}) => new Promise(
  async (resolve, reject) => {
    if (!categoryService.categoryExists(body.category))
      reject(Service.badRequestResponse(`Category with name ${body.category} does not exist`))
    else {
      let newProduct = saveNewProduct(body);
      resolve(Service.createdResponse(newProduct))
    }
  },
);

const deleteAProduct = ({productId}) => new Promise(
  async (resolve, reject) => {
    if (persistedProducts.has(productId)) {
      persistedProducts.delete(productId)
      resolve(Service.emptySuccessResponse());
    } else
      reject(Service.badRequestResponse(`Product with id ${productId} dot not exist`))
  },
);

function existsById(productId) {
  return persistedProducts.has(productId);
}

const getASpecificProduct = ({productId}) => new Promise(
  async (resolve, reject) => {
    if (existsById(productId))
      resolve(Service.successResponse(persistedProducts.get(productId)))
    else
      reject(Service.badRequestResponse(`A product with id ${productId} does not exist`))
  },
);

function findProductById(productId) {
  return persistedProducts.get(productId);
}

const modifyAProduct = ({productId, body}) => new Promise(
  async (resolve, reject) => {
    if (!persistedProducts.has(productId))
      reject(Service.badRequestResponse(`A product with ${productId} does not exist`))
    else {
      if (!categoryService.categoryExists(body.category))
        reject(Service.badRequestResponse(`Category with name ${body.category} does not exist`))
      else {
        let productToModify = findProductById(productId);
        productToModify.creator = body.creator
        productToModify.weight = body.weight
        productToModify.model = body.model
        productToModify.taggedBy = body.taggedBy
        productToModify.category = body.category
        productToModify.type = body.type
        resolve(Service.successResponse(productToModify));
      }
    }
  },
);

const searchProductsByModelAndAliases = ({query}) => new Promise(
  async (resolve, reject) => {
    let results = findAll().filter(product => product.model.includes(query)).concat(
      findAll().filter(product => product.aliases !== undefined && product.aliases.includes(query))
    )
    resolve(Service.successResponse(results));
  },
);

function saveNewProduct(body) {
  const nextId = [...persistedProducts.keys()].reduce((a, b) => Math.max(a, b), -Infinity) + 1;
  let newProduct = {
    id: nextId,
    marketPrice: body.marketPrice,
    creator: body.creator,
    weight: body.weight,
    model: body.model,
    taggedBy: body.taggedBy,
    category: body.category,
    type: body.type,
  }
  persistedProducts.set(newProduct.id, newProduct)
  return newProduct;
}

function findAll() {
  return [...persistedProducts.values()];
}

function mapProduct(productId, name) {
  let product = findProductById(productId)
  product.aliases.push(name)
}

module.exports = {
  findAllProducts,
  createANewProduct,
  deleteAProduct,
  getASpecificProduct,
  modifyAProduct,
  searchProductsByModelAndAliases,
  existsById,
  findProductById,
  findAll,
  mapProduct
};

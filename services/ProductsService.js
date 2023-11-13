const Service = require('./Service');

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

const findAllProducts = () => new Promise(
  async (resolve, reject) => {
    resolve(Service.successResponse([...persistedProducts.values()]));
  },
);

const createANewProduct = ({modifyProductDto}) => new Promise(
  async (resolve, reject) => {
    resolve(Service.successResponse({
      modifyProductDto,
    }));
  },
);

const deleteAProduct = ({productId}) => new Promise(
  async (resolve, reject) => {
    resolve(Service.successResponse({
      productId,
    }));
  },
);

const getASpecificProduct = ({productId}) => new Promise(
  async (resolve, reject) => {
    if (persistedProducts.has(productId))
      resolve(Service.successResponse(persistedProducts.get(productId)))
    else
      reject(Service.badRequestResponse(`A product with id ${productId} does not exist`))
  },
);

const modifyAProduct = ({productId, modifyProductDto}) => new Promise(
  async (resolve, reject) => {
    resolve(Service.successResponse({
      productId,
      modifyProductDto,
    }));
  },
);

const searchProductsByModelAndAliases = ({query}) => new Promise(
  async (resolve, reject) => {
    resolve(Service.successResponse({
      query,
    }));
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

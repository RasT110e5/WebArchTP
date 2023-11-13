const Service = require('./Service');
const productService = require('./ProductsService')

const aliasesArray = [
  {
    "id": 1,
    "name": "Elegant Frozen Tuna",
    "mappedTo": 10,
    "seller": "Bahringer LLC"
  },
  {
    "id": 2,
    "name": "Fantastic Rubber Shoes",
    "mappedTo": 16,
    "seller": "Welch Group"
  },
  {
    "id": 3,
    "name": "Tasty Steel Pizza",
    "mappedTo": null,
    "seller": "Hammes, Morar and Cremin"
  },
  {
    "id": 4,
    "name": "Luxurious Cotton Cheese",
    "mappedTo": null,
    "seller": "Romaguera, Hahn and Boyer"
  },
  {
    "id": 5,
    "name": "Rustic Fresh Ball",
    "mappedTo": 10,
    "seller": "Greenholt, Nader and Wilderman"
  },
  {
    "id": 6,
    "name": "Fantastic Granite Soap",
    "mappedTo": null,
    "seller": "Sipes, Franecki and Douglas"
  },
  {
    "id": 7,
    "name": "Luxurious Frozen Chicken",
    "mappedTo": null,
    "seller": "Russel Group"
  }
]

const persistedAliases = new Map()
aliasesArray.forEach(alias => persistedAliases.set(alias.id, alias))

const mapAliasToProduct = ({aliasId, productId}) => new Promise(
    async (resolve, reject) => {
      let aliasToMap = [...persistedAliases.values()].find(alias => alias.id === aliasId)
      if (aliasToMap === undefined)
        reject(Service.badRequestResponse(`Alias with id ${aliasId} could not be found`))
      else {
        if (!productService.existsById(productId)) {
          reject(Service.badRequestResponse(`Product with id ${productId} could not be found`))
        } else {
          aliasToMap.mappedTo = productId
          resolve(Service.successResponse(aliasToMap));
        }
      }
    }
  )
;

const findAllAliases = ({mappedOnly}) => new Promise(
    async (resolve, reject) => {
      let aliasesToReturn = [...persistedAliases.values()];
      if (mappedOnly) aliasesToReturn = aliasesToReturn.filter((alias) => alias.mappedTo !== null)
      resolve(Service.successResponse(aliasesToReturn));
    }
  )
;

const searchProductByAlias = ({body}) => new Promise(
  async (resolve, reject) => {
    let alias = [...persistedAliases.values()].find(alias => alias.name === body.name && alias.seller === body.seller)
    if (alias === undefined) {
      let newAlias = saveNewAlias(body.name, body.seller);
      persistedAliases.set(newAlias.id, newAlias)
      resolve(Service.notFoundResponse(newAlias));
    } else {
      if (alias.mappedTo === null)
        resolve(Service.successResponse({}));
      else if (!productService.existsById(alias.mappedTo)) {
        reject(Service.badRequestResponse(`Product with id ${alias.mappedTo} could not be found on the database, report invalid state`))
      } else {
        resolve(Service.successResponse(productService.findProductById(alias.mappedTo)));
      }
    }
  },
);

function saveNewAlias(name, seller) {
  const lastId = [...persistedAliases.keys()].reduce((a, b) => Math.max(a, b), -Infinity);
  return {
    id: lastId + 1,
    name: name,
    seller: seller,
    mappedTo: null
  };
}

module.exports = {
  mapAliasToProduct,
  findAllAliases,
  searchProductByAlias,
};

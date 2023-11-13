const Service = require('./Service');

const aliasesArray = [
  {
    "id": 1,
    "name": "Elegant Frozen Tuna",
    "mappedTo": null,
    "seller": "Bahringer LLC"
  },
  {
    "id": 2,
    "name": "Fantastic Rubber Shoes",
    "mappedTo": null,
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
    "mappedTo": 1,
    "seller": "Greenholt, Nader and Wilderman"
  },
  {
    "id": 6,
    "name": "Fantastic Granite Soap",
    "mappedTo": 2,
    "seller": "Sipes, Franecki and Douglas"
  },
  {
    "id": 7,
    "name": "Luxurious Frozen Chicken",
    "mappedTo": 3,
    "seller": "Russel Group"
  }
]

const persistedAliases = new Map()
aliasesArray.forEach(alias => persistedAliases.set(alias.id, alias))

/**
 * Map an alias to a product
 *
 * aliasId Integer The id of the alias to map
 * productId Integer The product id to mapped this alias to (optional)
 * returns Alias
 * */
const mapAliasToProduct = ({aliasId, productId}) => new Promise(
    async (resolve, reject) => {
      let aliasToMap = [...persistedAliases.values()].find(alias => alias.id === aliasId)
      if (aliasToMap === undefined)
        reject(Service.badRequestResponse(`Alias with id ${aliasId} could not be found`))
      else {
        //TODO: check for product existence
        aliasToMap.mappedTo = productId
        resolve(Service.successResponse(aliasToMap));
      }
    }
  )
;
/**
 * Find all product aliases
 *
 * mappedOnly Boolean Flag to filter and bring only aliases mapped to a product (optional)
 * returns List
 * */
const findAllAliases = ({mappedOnly}) => new Promise(
    async (resolve, reject) => {
      let aliasesToReturn = [...persistedAliases.values()];
      if (mappedOnly) aliasesToReturn = aliasesToReturn.filter((alias) => alias.mappedTo !== null)
      resolve(Service.successResponse(aliasesToReturn));
    }
  )
;

/**
 * Find a product by alias only and create the alias if a product is not found
 *
 * dto Dto with search data
 * returns Product
 * returns Alias
 * */
const searchProductByAlias = ({body}) => new Promise(
  async (resolve, reject) => {
    let alias = [...persistedAliases.values()].find(alias => alias.name === body.name && alias.seller === body.seller)
    if (alias === undefined) {
      let newAlias = saveNewAlias(body.name, body.seller);
      persistedAliases.set(newAlias.id, newAlias)
      resolve(Service.successResponse(newAlias));
    } else {
      if (alias.mappedTo === null)
        resolve(Service.successResponse({}));
      else
        //TODO get the product from different service
        resolve(Service.successResponse({}));
    }
    resolve(Service.successResponse({}));
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

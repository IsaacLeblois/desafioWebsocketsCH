//Packages
const Controller = require('../../fileSystem')
const productDB = new Controller('products')

//Product Routes
const productsController = {
    getAllProduct: async () => {
        try {
            const allProducts = await productDB.getAll()
            return allProducts
        } catch(err) {
            console.log(err)
        }
    },

    addNewProduct: async (product) => {
        try {
            const prevProducts = await productDB.getAll()

            const getNewId = () => {
                let lastID = 0
                if (prevProducts.length) {
                    lastID = prevProducts[prevProducts.length - 1].id
                }
                return lastID + 1
            }

            const newProduct = {
                id: getNewId(),
                title: product.title ? product.title : 'No Title',
                price: product.price ? product.price : 0,
                thumbnail: product.thumbnail ? product.thumbnail : 'No Image',
            }

            await productDB.add(newProduct)
        } catch(err) {
            console.log(err)
        }
    }
}

//Export
module.exports = productsController
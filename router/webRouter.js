const express = require('express')
const { apiController } = require('../controllers/apiController.js')
const { webController } = require('../controllers/webController.js')
const { carritoController } = require('../controllers/carritoController.js')
const webRouter = express.Router()

webRouter.get('/', webController.root)
webRouter.get('/index', webController.index)


webRouter.get('/api/productos', apiController.getAll)
webRouter.post('/api/productos/', apiController.create)
webRouter.get('/api/productos/:id', apiController.getOne)
webRouter.put('/api/productos/:id', apiController.update)
webRouter.delete('/api/productos/:id', apiController.delete)

webRouter.put('/api/carrito/:id', carritoController.updateOne)
webRouter.post('/api/carrito/', carritoController.create)
webRouter.post('/api/carrito/:id/productos', carritoController.addOne)
webRouter.get('/api/carrito/:id/productos', carritoController.getAll)
webRouter.delete('/api/carrito/:id/producto', carritoController.deleteOne)
webRouter.delete('/api/carrito/:id', carritoController.deleteAll)


module.exports = { webRouter }
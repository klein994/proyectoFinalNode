 const { databaseProductos } = require("../database/databaseProductos.js")

 const apiController = {
     root: (req, res) => {
         res.redirect('/api/productos');
     },
     getAll: (req, res) => {
         res.json(databaseProductos.getAll())
     },
     create: (req, res) => {
         console.log(req.body)
         let obj = {
             "title": req.body.title,
             "price": req.body.price,
             "thumbnail": req.body.thumbnail,
             "id": databaseProductos.getAll().length + 1
         }
         console.log(obj)
         async function guarda(obj) {

             try {
                 let g = await databaseProductos.create(obj)
                 let response = await res.redirect('/index')
             } catch (err) {
                 console.log(err)
             }
             return response
         }
         guarda(obj)
     },
     random: (req, res) => {
         res.json(databaseProductos.random())
     },
     getOne: (req, res) => {
         let id = parseInt(req.params.id)
         res.json(databaseProductos.getOne(id))
     },
     update: (req, res) => {
         let id = parseInt(req.params.id)
         let obj = {
             "tittle": req.body.tittle,
             "price": req.body.price,
             "thumbnail": req.body.thumbnail,
             "id": id
         }
         res.json(databaseProductos.update(obj))
     },
     delete: (req, res) => {
         let id = parseInt(req.params.id)
         async function borrar(id) {
             try {
                 let g = await databaseProductos.delete(id)
                 let response = await res.redirect('/index')
             } catch (err) {
                 console.log(err)
             }
             return response
         }
         borrar(id)
     }
 }

 module.exports = { apiController }
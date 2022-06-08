const { databaseCarritos } = require("../database/databaseCarrito.js")
const carritoController = {
    root: (req, res) => {
        res.redirect('/api/productos');
    },
    getAll: (req, res) => {
        res.json(databaseCarritos.getAll())
    },
    create: (req, res) => {
        console.log(req.body)

        let obj = {
            "id": databaseCarritos.getAll().length + 1,
            "productos": [{
                "tittle": req.body.tittle,
                "price": req.body.price,
                "thumbnail": req.body.thumbnail,
                "id": req.body.id
            }]
        }
        async function guarda(obj) {
            try {
                let g = await databaseCarritos.create(obj)
                let response = await res.redirect('/index')
            } catch (err) {
                console.log(err)
            }
            return response
        }
        guarda(obj)
    },
    addOne: (req, res) => {

    },
    random: (req, res) => {

    },
    getOne: (req, res) => {
        let id = parseInt(req.params.id)
        res.json(databaseCarritos.getOne(id))
    },
    updateOne: (req, res) => {
        let id = parseInt(req.params.id)
        let obj = {
            "tittle": req.body.tittle,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
            "id": id
        }
        res.json(databaseCarritos.update(obj))
    },
    deleteOne: (req, res) => {
        let id = parseInt(req.params.id)

        async function borrar(id) {
            try {
                let g = await databaseCarritos.delete(id)
                let response = await res.redirect('/index')
            } catch (err) {
                console.log(err)
            }

            return response
        }
        borrar(id)
    },
    deleteAll: (req, res) => {
        let id = parseInt(req.params.id)

        async function borrar(id) {
            try {
                let g = await databaseCarritos.delete(id)
                let response = await res.redirect('/index')
            } catch (err) {
                console.log(err)
            }

            return response
        }
        borrar(id)
    }
}

module.exports = { carritoController }
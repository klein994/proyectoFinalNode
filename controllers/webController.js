const { databaseCarritos } = require("../database/databaseCarrito.js");
const { databaseProductos } = require("../database/databaseProductos.js")
const webController = {
    root: (req, res) => {
        res.redirect('/index');
    },

    index: (req, res) => {

        const productosN = databaseProductos.getAll()
        const carritoN = databaseCarritos.getAll()

        const datos = {
            productosN,
            carritoN,
            hayProductos: Boolean(productosN.length > 0),
            hayCarrito: Boolean(carritoN.length > 0),
        }


        res.render('datos', datos);
    }
}

module.exports = { webController }
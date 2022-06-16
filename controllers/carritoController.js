const { databaseCarritos } = require("../database/databaseCarrito.js")
const {response} = require("express");
const {databaseProductos} = require("../database/databaseProductos");
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
    updateOne: async(req, res) => {

            let contenido = await this.getAll();
            let productoBuscado = contenido.find(producto => producto.id == id);
            if(!productoBuscado) {
                const error = new Error('No existe un producto con ese id')
                error.tipo = 'Product not found'
                throw error;
            }
            Object.keys(producto).forEach(el => {
                productoBuscado[el]=producto[el];
            });
            await sobreescribrirArchivo(this.nombreArchivo, contenido);
            return productoBuscado;

    },
    deleteOne: async (req, res) => {
        const carritoID = req.params.cId;
        const productoID = req.params.prdId;
        const cartToDelete = await databaseCarritos.getById(databaseProductos.id.productos.id);
        if(cartToDelete.productos.includes(productoID)){
            cartToDelete.productos = cartToDelete.productos.filter(producto => producto !== productoID);
            databaseProductos.update(carritoID, cartToDelete);
        }
        res.json(cartToDelete);
    },
    deleteAll:  async (req, res) => {
        const carritoID = req.params.cId;
        const cartToDelete = await databaseCarritos.getOne(carritoID);
        databaseCarritos.id.productos = [];
        carritos.updateById(carritoID, cartToDelete);
        res.json(cartToDelete);
    }
}

module.exports = { carritoController }
const { redirect } = require('express/lib/response')
const fs = require('fs')
const productos = require('./productos.json')


const productosFs = './database/productos.json'
const databaseProductos = {
    getAll: () => {
        return [...productos]
    },
    create: (obj) => {
        try {
            let product = databaseProductos.getAll()
            product.push(obj)
            fs.writeFileSync(productosFs, JSON.stringify(product))
            console.log(`Objeto Guardado ID = ${product.length}`)

        } catch (error) {
            throw error
        }
    },
    random: () => {
        let maximo = productos.length
        let id = Math.round(Math.random() * (maximo - 1) + 1);
        return productos.filter(a => a.id === id)
    },
    getOne: (id) => {
        let producto = productos.filter(a => a.id === id)
        if (producto.length >= 1) {
            return producto
        } else {
            return `El id: ${id} no fué encontrado `
        }
    },
    update: (obj) => {

        try {
            let product = productos.filter(a => a.id !== obj.id)
            product.push(obj)
            fs.writeFileSync(productosFs, JSON.stringify(product))
            console.log(`Objeto actualizado ID = ${obj.id}`)
        } catch (error) {
            throw error
        }

    },
    delete: (id) => {
        try {
            let products = fs.readFileSync(productosFs, 'utf-8')
            let items = JSON.parse(products)
            let item = items.findIndex(obj => obj.id === id)
            if (item >= 1) {
                items.splice(item, 1)
            } else {
                console.log(`El id ${id} no fué encontrado `)
            }
            fs.writeFileSync(productosFs, JSON.stringify(items))
            return `Borrado el id:${id}`
        } catch (error) {
            throw error
        }
    }
}

module.exports = { databaseProductos }
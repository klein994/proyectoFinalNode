const { redirect } = require('express/lib/response')
const fs = require('fs')
const carritos = require('./carrito.json')


const carritosFs = './database/carrito.json'
const databaseCarritos = {
    getAll: () => {
        return [...carritos]
    },
    create: (obj) => {
        try {
            let product = databaseCarritos.getAll()
            product.push(obj)
            fs.writeFileSync(carritosFs, JSON.stringify(product))
            console.log(`Objeto Guardado ID = ${product.length}`)

        } catch (error) {
            throw error
        }
    },
    random: () => {
        let maximo = carritos.length
        let id = Math.round(Math.random() * (maximo - 1) + 1);
        return carritos.filter(a => a.id === id)
    },
    getOne: (id) => {
        let producto = carritos.filter(a => a.id === id)
        if (producto.length >= 1) {
            return producto
        } else {
            return `El id: ${id} no fué encontrado `
        }
    },
    update: (obj) => {

        try {
            let product = carritos.filter(a => a.id !== obj.id)
            product.push(obj)
            fs.writeFileSync(carritosFs, JSON.stringify(product))
            console.log(`Objeto actualizado ID = ${obj.id}`)
        } catch (error) {
            throw error
        }

    },
    delete: (id) => {
        try {
            let products = fs.readFileSync(carritosFs, 'utf-8')
            let items = JSON.parse(products)
            let item = items.findIndex(obj => obj.id === id)
            if (item >= 1) {
                items.splice(item, 1)
            } else {
                console.log(`El id ${id} no fué encontrado `)
            }
            fs.writeFileSync(carritosFs, JSON.stringify(items))
            return `Borrado el id:${id}`
        } catch (error) {
            throw error
        }
    }
}

module.exports = { databaseCarritos }
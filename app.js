const pm = require('./productManager');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor');
});

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    // const productos = pm.manager.getProducts();
    // !limit ? res.send(productos) : res.send(productos.slice(0, limit));
    pm.resp()
        .then((data) => {
            !limit ? res.send(data) : res.send(data.slice(0, limit));
        })
});

app.get('/products/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const producto = pm.manager.getProductById(id);
    producto ? res.send(producto) : res.send('No se encontro el producto');
});

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
const pm = require('./productManager');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor');
});

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    pm.manager.getProductos()
        .then((data) => {
            !limit ? res.send(data) : res.send(data.slice(0, limit));
        })
});

app.get('/products/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    const error = {"error":"No se encontro el producto"};
    pm.manager.getProductoById(id)
    .then((data) => {
        data ? res.send(data) : res.send(error)
    })
});

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
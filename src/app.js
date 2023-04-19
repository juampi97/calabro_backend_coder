import express from "express";
import  productsRouter  from "./routers/products.router.js";
import  cartsRouter  from "./routers/carts.router.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";

const app = express();
app.use(express.json());

// app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index', {name: 'Mabel'});
});

app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";
import { Server } from "socket.io";
import { manager } from "./manager/productManager.js";
import mongoose from "mongoose";
import productModel from "./model/products.model.js"; 

const uri = "mongodb+srv://coderhouse:coderhouse@cluster0.2x8nri1.mongodb.net/"

const app = express();
app.use(express.json());

/*const httpServer = app.listen(8080, () =>
  console.log("Servidor escuchando en el puerto 8080")
);
*/

//const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

/*
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  manager.getProductos().then((data) => {
    if (data) {
      io.emit("resp-new-product", data);
    }
  });
  socket.on("new-product", (data) => {
    manager.addProduct(data).then((data) => {
      if (data == "406b") {
        socket.emit("resp-new-product", "El producto ya existe" );
      } else if (data == "406a") {
        socket.emit("resp-new-product", "Todos los campos son obligatorios" );
      } else {
        manager.getProductos().then((data) => {
          if (data) {
            io.emit("resp-new-product", data);
          }
        });
      }
    });
  });
  socket.on('delete-product', (id) => {
    manager.deleteProducto(parseInt(id)).then((data) => {
      if (data == 406) {
        socket.emit("resp-delete-product", "El producto no existe" );
      } else {
        manager.getProductos().then((data) => {
          if (data) {
            io.emit("resp-delete-product", data);
          }
        });
      }
    });
  });
});
*/

mongoose.set('strictQuery', false)

try {
  await mongoose.connect(uri)
  console.log('DB connected!')
  app.listen(8080, () => console.log('Server up'))
} catch (err) {
  console.log('No se puede conectar a la BD')
}

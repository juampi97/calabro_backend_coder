import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

const httpServer = app.listen(8080, () =>
  console.log("Servidor escuchando en el puerto 8080")
);

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname+"/public"));

app.use("/", viewsRouter);
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.on("new-product", (data) => {
    console.log(data);
    io.emit("new-product", data);
  });
});

import express from "express";
import { __dirname, passportCall } from "./utils.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import viewsRouter from "./routers/views.router.js";
import chatRouter from "./routers/chat.router.js";
import sessionRouter from "./routers/session.router.js";
import productViewsRouter from "./routers/products.view.router.js";
import mongoose from "mongoose";


import  chatManager  from "./dao/messagesManager.js";
import messageModel from "./model/mesagges.model.js";

import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import cookieParser from "cookie-parser";

import passport from "passport"
import initializePassport from "./config/passport.config.js";

import config from "./config/config.js";

const uri = config.mongoURL;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser("S3crEt"));
app.use((session({
  store: MongoStore.create({ 
    mongoUrl: uri,
    dbName: config.db_name,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
   }),
   secret: config.db_password,
   resave: true,
   saveUninitialized: true 
})));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/" ,viewsRouter);
app.use("/chat", chatRouter);
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/session/", sessionRouter);
app.use("/products", passportCall('jwt') , productViewsRouter)

mongoose.set("strictQuery", false);

const httpServer = app.listen(config.port, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${config.port}`);
});
const io = new Server(httpServer);

try {
  await mongoose.connect(uri,{
    dbName: config.db_name,
  });
  console.log("DB connected!");
} catch (err) {
  console.log("No se puede conectar a la BD");
}

let messages = [];
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  io.emit("messageLogs", messages);
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
    let id = chatManager.getID();
    messageModel.updateOne({ _id: id }, { messages: messages }).then((data) => {
      console.log(data);
    });
  });
});

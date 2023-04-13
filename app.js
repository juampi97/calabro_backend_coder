const pm = require("./productManager");

const express = require("express");
const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Bienvenido a mi servidor");
// });

app.get("/", (req, res) => {
  const limit = req.query.limit;
  pm.manager.getProductos().then((data) => {
    !limit ? res.send(data) : res.send(data.slice(0, limit));
  });
});

app.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  pm.manager.getProductoById(id).then((data) => {
    if (data == "406a") {
      res.status(406).send("No hay productos");
    } else if (data == "406b") {
      res.status(406).send("No existe el producto");
    } else {
      res.send(data);
    }
  });
});

app.post("/", (req, res) => {
  const product = req.body;
  pm.manager.addProduct(product).then((data) => {
    if (data == "406b") {
      res.status(406).send("El producto ya existe");
    } else if (data == "406a") {
      res.status(406).send("Complete todos los campos");
    } else {
      res.status(201).send("Producto agregado");
    }
  });
});

app.put("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const mods = req.body;
  if ("id" in mods) {
    delete mods.id;
  }
  pm.manager.updateProducto(id, mods).then((data) => {
    if (data == 406) {
      res.status(406).send("El producto no existe");
    } else {
      res.status(201).send("Producto modificado");
    }
  });
});

app.delete("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  pm.manager.deleteProducto(id).then((data) => {
    console.log(data);
    if (data == 406) {
      res.status(406).send("El producto no existe");
    } else {
      res.status(202).send("Producto eliminado");
    }
  });
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

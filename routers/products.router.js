import { manager } from "../productManager.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    const limit = req.query.limit;
    manager.getProductos().then((data) => {
      !limit ? res.send(data) : res.send(data.slice(0, limit));
    });
  });
  
  router.get("/:pid", (req, res) => {
    const id = parseInt(req.params.pid);
    manager.getProductoById(id).then((data) => {
      if (data == "406a") {
        res.status(406).send("No hay productos");
      } else if (data == "406b") {
        res.status(406).send("No existe el producto");
      } else {
        res.send(data);
      }
    });
  });
  
  router.post("/", (req, res) => {
    const product = req.body;
    manager.addProduct(product).then((data) => {
      if (data == "406b") {
        res.status(406).send("El producto ya existe");
      } else if (data == "406a") {
        res.status(406).send("Complete todos los campos");
      } else {
        res.status(201).send("Producto agregado");
      }
    });
  });
  
  router.put("/:pid", (req, res) => {
    const id = parseInt(req.params.pid);
    const mods = req.body;
    if ("id" in mods) {
      delete mods.id;
    }
    manager.updateProducto(id, mods).then((data) => {
      if (data == 406) {
        res.status(406).send("El producto no existe");
      } else {
        res.status(201).send("Producto modificado");
      }
    });
  });
  
  router.delete("/:pid", (req, res) => {
    const id = parseInt(req.params.pid);
    manager.deleteProducto(id).then((data) => {
      console.log(data);
      if (data == 406) {
        res.status(406).send("El producto no existe");
      } else {
        res.status(202).send("Producto eliminado");
      }
    });
  });

  export default router
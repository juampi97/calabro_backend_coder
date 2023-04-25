import { manager } from "../manager/cartsManager.js";
import { manager as pManager } from "../manager/productManager.js";
import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  manager.addCart().then((data) => {
    if (data == 201) {
      res.status(201).send({ status: "success", paiload: "Carrito agregado" });
    } else {
      res
        .status(406)
        .send({ status: "error", paiload: "No se pudo agregar el carrito" });
    }
  });
});

router.get("/:cid", (req, res) => {
  const cid = parseInt(req.params.cid);
  manager.getCarritoById(cid).then((data) => {
    if (data == "406a") {
      res.status(406).send({ status: "error", paiload: "No hay carritos" });
    } else if (data == "406b") {
      res
        .status(406)
        .send({ status: "error", paiload: "No existe el carrito" });
    } else {
      res.send({ status: "success", paiload: data.products });
    }
  });
});

router.post("/:cid/product/:pid", (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  pManager.getProductoById(pid).then((data) => {
    if (data == "406a") {
      res.status(406).send({ status: "error", paiload: "No hay productos" });
    } else if (data == "406b") {
      res
        .status(406)
        .send({ status: "error", paiload: "No existe el producto" });
    } else {
      manager.getCarritoById(cid).then((data) => {
        if (data == "406a") {
          res.status(406).send({ status: "error", paiload: "No hay carritos" });
        } else if (data == "406b") {
          res
            .status(406)
            .send({ status: "error", paiload: "No existe el carrito" });
        } else {
          manager.addProduct(cid, pid).then((data) => {
            res.status(201).send({ status: "success", paiload: "Producto agregado" });
          });
        }
      });
    }
  });
});

export default router;

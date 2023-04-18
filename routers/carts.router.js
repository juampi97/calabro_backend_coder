import { manager } from "../cartsManager.js";
import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
    manager.addCart().then((data) => {
        if (data == 201) {
            res.status(201).send({ status: 'success', paiload: 'Carrito agregado' });
        } else {
            res.status(406).send({ status: 'error', paiload: 'No se pudo agregar el carrito' });
        }
    });
});

router.get("/:cid", (req, res) => {
    const cid = parseInt(req.params.cid);
    manager.getCarritoById(cid).then((data) => {
      if (data == "406a") {
        res.status(406).send({ status: "error", paiload: "No hay carritos" });
      } else if (data == "406b") {
        res.status(406).send({ status: "error", paiload: "No existe el carrito" });
      } else {
        res.send({ status: "success", paiload: data.products });
      }
    });
  });

router.post("/:cid/product/:pid", (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    console.log(cid, pid);
});

export default router;
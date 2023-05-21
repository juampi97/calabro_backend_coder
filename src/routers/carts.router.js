import { manager as cManager } from "../manager/db/cartsManager.js";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  cManager.addCart().then((data) => {
    if (data) {
      res.send({ result: "succes", payload: data });
    }
  });
});

router.get("/", async (req, res) => {
  cManager.getCarts().then((data) => {
    if (data) {
      res.send({ result: "succes", payload: data });
    }
  });
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  cManager.getCartById(cid).then((data) => {
    if (data == "406") {
      res.send({ result: "error", payload: "Carrito no encontrado." });
    } else {
      res.send({ result: "succes", payload: data });
    }
  });
});

router.post("/:cid/product/:pid", (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  cManager.addProductToCart(cid, pid).then((data) => {
    if (data == "406") {
      res.send({ result: "error", payload: "No se pudo agregar el producto al carrito." });
    } else {
      res.send({ result: "succes", payload: data });
    }
  });
});

export default router;

import express from "express";
import { manager } from "../manager/productManager.js";

const router = express.Router();

router.get("/", (req, res) => {
  manager.getProductos().then((data) => {
    if (data) {
      res.render("home", { data });
    }
  });
});

router.get("/realtimeproducts", (req, res) => {
  manager.getProductos().then((data) => {
    if (data) {
      res.render("realtimeproducts", { data });
    }
  });
});

export default router;

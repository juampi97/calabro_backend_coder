import express from "express";
import { manager } from "../manager/db/productManager.js";

const router = express.Router();

/*
router.get("/", (req, res) => {
  manager.getProductos().then((data) => {
    if (data) {
      res.render("home", { data });
    }
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});
*/

router.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const query = req.query.query;
  const filter = req.query.filter;
  const sort = req.query.sort;
  manager.getProductsView(limit, page, query, filter, sort).then((data) => {
    if (data) {
      res.render("products", { data });
    }
  });
});

export default router;

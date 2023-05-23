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

router.get("/", (req, res) => {
  manager.getProductosView().then((data) => {
    if (data) {
      res.send({ status: "success", paiload: data });
    }
  });
});

router.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const query = req.query.query;
  const sort = req.query.sort;

  let limite="", consulta="", orden="";
  if (limit) limite = `&limit=${limit}`;
  if (query) consulta = `&query=${query}`;
  if (sort) orden = `&sort=${sort}`;

  manager.getProductosView(limit, page, query, sort).then((data) => {
    if (data) {
      let prevLink = '';
      let nextLink = '';
      data.hasPrevPage ? prevLink = `/products?page=${data.prevPage}${limite}${consulta}${orden}` : prevLink = ''
      data.hasNextPage ? nextLink = `/products?page=${data.nextPage}${limite}${consulta}${orden}` : nextLink = ''
      res.render("products", { data, prevLink, nextLink });
    }
  });
});

export default router;

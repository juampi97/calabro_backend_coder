import { manager } from "../dao/productManager.js";

export async function getProducts(req, res) {
    const limit = req.query.limit;
    const page = req.query.page;
    const query = req.query.query;
    const filter = req.query.filter;
    const sort = req.query.sort;
    manager.getProducts(limit, page, query, filter, sort).then((data) => {
      if (data) {
        res.send({ status: "success", paiload: data });
      } else {
        res.status(406).send({ status: "error", paiload: "No hay productos" });
      }
    });
}

export async function addProduct(req, res) {
    const product = req.body;
    manager.addProduct(product).then((data) => {
      if (data == "406b") {
        res
          .status(406)
          .send({ status: "error", paiload: "El producto ya existe" });
      } else if (data == "406a") {
        res
          .status(406)
          .send({ status: "error", paiload: "Complete todos los campos" });
      } else {
        res.send({ result: "succes", payload: data });
      }
    });
}
import { manager } from "../dao/productManager.js";
import { manager as cManager } from "../dao/cartsManager.js";
import userModel from "../model/user.model.js";
import { passportCall } from "../utils.js";

export async function getProducts(req, res) {
  const limit = req.query.limit;
  const page = req.query.page;
  const query = req.query.query;
  const sort = req.query.sort;

  if (!req.user)
    return res.render("errors/base", {
      error: "No tienes los permisos para acceder a esta seccion.",
    });

  const mail = req.user.user.email;
  const nombre = req.user.user.first_name;
  const apellido = req.user.user.last_name;
  let rol = req.user.user.role;

  let limite = "",
    consulta = "",
    orden = "";
  if (limit) limite = `&limit=${limit}`;
  if (query) consulta = `&query=${query}`;
  if (sort) orden = `&sort=${sort}`;

  manager.getProductosView(limit, page, query, sort).then((data) => {
    if (data) {
      let prevLink = "";
      let nextLink = "";

      data.hasPrevPage
        ? (prevLink = `/products?page=${data.prevPage}${limite}${consulta}${orden}`)
        : (prevLink = "");
      data.hasNextPage
        ? (nextLink = `/products?page=${data.nextPage}${limite}${consulta}${orden}`)
        : (nextLink = "");

      const front_pagination = [];
      for (let index = 1; index <= data.totalPages; index++) {
        front_pagination.push({
          page: index,
          active: index == data.page,
        });
      }

      res.render("products", {
        data,
        prevLink,
        nextLink,
        front_pagination,
        mail,
        nombre,
        apellido,
        rol,
      });
    }
  });
}

import { manager as cManager } from "../dao/cartsManager.js";

export async function newCart(req, res) {
  cManager.addCart().then((data) => {
    if (data) {
      res.send({ result: "succes", payload: data });
    }
  });
}

export async function getCartById(req, res) {
    const cid = req.params.cid;
    cManager.getCartById(cid).then((data) => {
      if (data == "406") {
        res.send({ result: "error", payload: "Carrito no encontrado." });
      } else {
        res.send({ result: "succes", payload: data });
      }
    });
}

export async function getProducCartById(req, res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    cManager.addProductToCart(cid, pid).then((data) => {
      if (data == "406") {
        res.send({
          result: "error",
          payload: "No se pudo agregar el producto al carrito.",
        });
      } else {
        res.send({ result: "succes", payload: data });
      }
    });    
}

export function deleteProductCartById(req, res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    cManager.deleteProductToCart(cid, pid).then((data) => {
      if (data == "406") {
        res.send({
          result: "error",
          payload: "No se pudo eliminar el producto al carrito.",
        });
      } else {
        res.send({ result: "succes", payload: data });
      }
    });
}

export function deleteProduct(req, res) {
    const cid = req.params.cid;
    cManager.resetCart(cid).then((data) => {
      if (data == "406") {
        res.send({
          result: "error",
          payload: "No se pudo eliminar el producto al carrito.",
        });
      } else {
        res.send({ result: "succes", payload: data });
      }
    });
}

export function putProduct(req, res) {
    const cid = req.params.cid;
    const arrayBody = req.body;
    // if (arrayBody.hasOwnProperty("product") && arrayBody.hasOwnProperty("qty")) {
    if (arrayBody.length > 0) {
      let format = true;
      for (let i = 0; i < arrayBody.length; i++) {
        if (
          !arrayBody[i].hasOwnProperty("product") ||
          !arrayBody[i].hasOwnProperty("qty")
        ) {
          format = false;
          break;
        }
      }
      if (!format) {
        res.send({
          result: "error",
          payload: "No se pudo actualizar el producto al carrito.",
        });
      } else {
        cManager.updateAllCart(cid, arrayBody).then((data) => {
          if (data == "406") {
            res.send({
              result: "error",
              payload: "No se pudo actualizar el producto al carrito.",
            });
          } else {
            res.send({ result: "succes", payload: data });
          }
        });
      }
    } else {
      res.send({
        result: "error",
        payload: "No se pudo actualizar el producto al carrito.",
      });
    }    
}

export function putProductCart(req, res) {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const body = req.body;
    if (!body.hasOwnProperty("qty")) {
      res.send({
        result: "error",
        payload: "No se pudo actualizar el producto al carrito.",
      });
    } else {
      if(body.qty < 1){
        res.send({
          result: "error",
          payload: "No se pudo actualizar el producto al carrito.",
        });
      } else {
        cManager.updateOneItemCart(cid, pid, body).then((data) => {
          if(data == 406){
            res.send({
              result: "error",
              payload: "No se pudo actualizar el producto al carrito.",
            });
          } else {
            res.send({ result: "succes", payload: data });
          }
        });
      }
    }    
}

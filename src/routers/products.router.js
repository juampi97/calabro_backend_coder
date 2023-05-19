import { manager } from "../manager/productManager.js";
import { Router } from "express";
import  productModel  from "../model/products.model.js"

const router = Router();

/*
router.get("/", (req, res) => {
  const limit = req.query.limit;
  manager.getProductos().then((data) => {
    if(data){
      !limit
      ? res.send({ status: "success", paiload: data })
      : res.send({ status: "success", paiload: data.slice(0, limit) });
    } else {
      res.status(406).send({ status: "error", paiload: "No hay productos" });
    }
  });
});

router.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  manager.getProductoById(id).then((data) => {
    if (data == "406a") {
      res.status(406).send({ status: "error", paiload: "No hay productos" });
    } else if (data == "406b") {
      res.status(406).send({ status: "error", paiload: "No existe el producto" });
    } else {
      res.send({ status: "success", paiload: data });
    }
  });
});

router.post("/", (req, res) => {
  const product = req.body;
  if ("id" in product) {
    delete product.id;
  }
  manager.addProduct(product).then((data) => {
    if (data == "406b") {
      res.status(406).send({ status: "error", paiload: "El producto ya existe" });
    } else if (data == "406a") {
      res.status(406).send({ status: "error", paiload: "Complete todos los campos" });
    } else {
      res.status(201).send({ status: "success", paiload: "Producto agregado" });
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
      res.status(406).send({ status: "error", paiload: "El producto no existe" });
    } else {
      res.status(201).send({ status: "success", paiload: "Producto modificado" });
    }
  });
});

router.delete("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  manager.deleteProducto(id).then((data) => {
    if (data == 406) {
      res.status(406).send({ status: "error", paiload: "El producto no existe" });
    } else {
      res.status(201).send({ status: "success", paiload: "Producto eliminado" });
    }
  });
});
*/

router.get('/', async (req,res)=>{
  try{
    let products = await productModel.find()
    console.log(products);
    res.send({result: "succes", payload: products})
  }catch(err){
    console.log("Cannot get products with mongoose: "+err);
  }
})

router.post("/", async (req, res) => {
  const product = req.body;
  let { title, description, price, thumbnail, code, stock } = product;
  manager.addProduct(product).then((data) => {
    if (data == "406b") {
      res.status(406).send({ status: "error", paiload: "El producto ya existe" });
    } else if (data == "406a") {
      res.status(406).send({ status: "error", paiload: "Complete todos los campos" });
    } else {
      //res.status(201).send({ status: "success", paiload: "Producto agregado" });
      let result = productModel.create({
        title,
        description,
        price,
        thumbnail,
        code,
        stock
        //status
      })
      res.send({result: "succes", payload: result})
    }
  });
});

export default router;

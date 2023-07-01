import { Router } from "express";
import { putProductCart, putProduct, deleteProduct, deleteProductCartById, getProducCartById, getCartById, newCart } from "../controllers/carts.controller.js";

const router = Router();

router.post("/", async (req, res) => {

});

router.get("/", newCart);

router.get("/:cid", getCartById);

router.post("/:cid/product/:pid", getProducCartById);

router.delete("/:cid/product/:pid", deleteProductCartById);

router.delete("/:cid", deleteProduct);

router.put("/:cid", putProduct);

router.put("/:cid/product/:pid", putProductCart);

export default router;

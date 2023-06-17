import express from "express";
import { manager } from "../manager/db/productManager.js";
import { manager as cManager } from "../manager/db/cartsManager.js";
import userModel from "../model/user.model.js";
import { passportCall } from "../utils.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("session/login");
});

router.get("/carts/:cid", (req, res) => {
  const cid = req.params.cid;
  cManager.getCartByIdView(cid).then((data) => {
    if (data) {
      res.render("cart", { cid, data });
    }
  });
});

export default router;

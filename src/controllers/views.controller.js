import { manager } from "../dao/productManager.js";
import { manager as cManager } from "../dao/cartsManager.js";
import userModel from "../model/user.model.js";
import { passportCall } from "../utils.js";

export function main(req, res){
    res.redirect("session/login");
}

export function getCarts(req, res){
    const cid = req.params.cid;
    cManager.getCartByIdView(cid).then((data) => {
      if (data) {
        res.render("cart", { cid, data });
      }
    });
}
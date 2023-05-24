import cartModel from "../../model/carts.model.js";
import productModel from "../../model/products.model.js";

class CartsManger {
  #path;
  #carts;
  constructor() {
    this.#carts = [];
  }
  addCart = async () => {
    let products = [];
    let result = cartModel.create({
      products,
    });
    return result;
  };

  getCarts = async () => {
    try {
      let carts = await cartModel.find();
      return carts;
    } catch (err) {
      console.log("Cannot get carts with mongoose: " + err);
    }
  };

  getCartById = async (id) => {
    try {
      // let cart = await cartModel.findOne({_id: id}).populate("products.product");
      let cart = await cartModel.findOne({ _id: id });
      return cart;
    } catch (err) {
      return "406";
    }
  };

  addProductToCart = async (cid, pid) => {
    try {
      let product = await productModel.findOne({ _id: pid });
      let cart = await cartModel.findOne({ _id: cid });
      console.log("Mi producto");
      console.log(cart.products[0].id.toString());
      if (cart.products.length == 0) {
        cart.products.push({ id: pid, qty: 1 });
        const result = await cartModel.updateOne(
          { _id: cid },
          { products: cart.products }
        );
      } else {
        let found = false;
        console.log("Prods carrito");
        for (let i = 0; i < cart.products.length; i++) {
          console.log(cart.products[i].id.toString());
          if (cart.products[i].id.toString() == pid) {
            cart.products[i].qty++;
            found = true;
            break;
          }
        }
        console.log(found);
        if (!found) {
          cart.products.push({ id: pid, qty: 1 });
        }
        const result = await cartModel.updateOne(
          { _id: cid },
          { products: cart.products }
        );
      }
      
      return "200";
    } catch (err) {
      console.log("Cannot get carts with mongoose: " + err);
      return "406";
    }
  };
}

const manager = new CartsManger();

export { manager, CartsManger };

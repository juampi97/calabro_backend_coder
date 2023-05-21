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
    try{
      let carts = await cartModel.find();
      return carts;
    } catch(err) {
      console.log("Cannot get carts with mongoose: " + err);
    }
  };

  getCartById = async (id) => {
    try{
      // let cart = await cartModel.findOne({_id: id}).populate("products.product");
      let cart = await cartModel.findOne({_id: id});
      return cart;
    } catch(err) {
      return "406";
    }

  };

  addProductToCart = async (cid, pid) => {
    try{
      let product = await productModel.findOne({_id: pid});
      let cart = await cartModel.findOne({_id: cid});
      
      cart.products.push( {product: pid} );
      const result = await cartModel.updateOne({_id: cid}, cart);

      /*if(cart.products.length == 0) {
        let item = {id:product._id, cantidad:1};
        cart.products.push(item);
      } else {
        let found = false;
        for(let i = 0; i < cart.products.length; i++) {
          if(cart.products[i].id == pid) {
            cart.products[i].cantidad++;
            found = true;
          }
        }
        if(!found) {
          let item = {id:product._id, cantidad:1};
          cart.products.push(item);
        }
      }*/
      console.log(result);
      return "200"
    } catch(err) {
      console.log("Cannot add product to cart with mongoose: " + err);
      return "406";
    }
  };
}

const manager = new CartsManger();

export { manager, CartsManger };

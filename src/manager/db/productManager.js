import productModel from "../../model/products.model.js";

class ProductManager {
  #path;
  #products;
  constructor() {
    this.#products = [];
  }

  getProducts = async (limit, page, query, filter, sort) => {
    let products = [];
    let ordenar = 0;
    if(sort == "desc") {
      ordenar = -1;
    } else if(sort == "asc") {
      ordenar = 1;
    } else {
      sort = 0;
    }
    try {
      if(query && filter) {
        if(query === "title") {
          !sort ? products = await productModel.find({title: filter}) : products = await productModel.find({title: filter}).sort({price: ordenar});
        } else if(query === "status"){
          !sort ? products = await productModel.find({status: filter}): products = await productModel.find({status: filter}).sort({price: ordenar});
        }
      } else {
          !sort ? products = await productModel.find() : products = await productModel.find().sort({price: ordenar});
      }
      !page ?   products = products.slice(0, 10) : products = products.slice(10*page, 10*page+10);
      !limit ?  products = products.slice(0, 10) : products = products.slice(0, limit);     
      return products;
    } catch (err) {
      console.log("Cannot get products with mongoose: " + err);
    }
  };

  getProductsView = async (limit, page, query, filter, sort) => {
    let products = [];
    let ordenar = 0;
    if(sort == "desc") {
      ordenar = -1;
    } else if(sort == "asc") {
      ordenar = 1;
    } else {
      sort = 0;
    }
    try {
      if(query && filter) {
        if(query === "title") {
          !sort ? products = await productModel.find({title: filter}).lean().exec() : products = await productModel.find({title: filter}).sort({price: ordenar}).lean().exec();
        } else if(query === "status"){
          !sort ? products = await productModel.find({status: filter}).lean().exec(): products = await productModel.find({status: filter}).sort({price: ordenar}).lean().exec();
        }
      } else {
          !sort ? products = await productModel.find().lean().exec() : products = await productModel.find().sort({price: ordenar}).lean().exec();
      }
      !page ?   products = products.slice(0, 10) : products = products.slice(10*page, 10*page+10);
      !limit ?  products = products.slice(0, 10) : products = products.slice(0, limit);     
      return products;
    } catch (err) {
      console.log("Cannot get products with mongoose: " + err);
    }
  };

  addProduct = async (product) => {
    let codigo = 0;
    let { title, description, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !code || !stock) {
      codigo = "406a"; // Campos incompletos
      return codigo;
    }
    let products = await productModel.find({ code: code });
    if (products.length > 0) {
      codigo = "406b"; // Producto ya existe
      return codigo;
    }
    //let producto = { ...product, status: true };
    if (!thumbnail) {
      thumbnail = [];
    }
    let result = productModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status: true
    });
    return result;
  };

  getProductById = async (id) => {
    let data
    let product = await productModel.findOne({ _id: id });
    !product ? (data = "406") : (data = product);
    return data;
  };
  
}

const manager = new ProductManager();

export { manager, ProductManager };

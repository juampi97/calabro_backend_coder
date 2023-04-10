const fs = require("fs");
const fsp = require("node:fs/promises");

const filename = "./products.json";

class ProductManager {
  #path;
  #products;
  constructor() {
    this.#products = [];
    this.#path = "./products.json";
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return console.log("Por favor, complete todos los datos");
    let id = this.#generateId();
    let product = { id, title, description, price, thumbnail, code, stock };
    this.#saveFile(product);
  };

  #saveFile = (product) => {
    if (!fs.existsSync(this.#path)) {
      fs.writeFileSync(this.#path, JSON.stringify([], null, "\t"));
    }
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (this.#products.find((item) => item.code === product.code))
      return console.log("Ya existe un producto con el mismo codigo");
    this.#products.push(product);
    fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, "\t"));
  };

  #generateId = () => {
    if (!fs.existsSync(this.#path)) return 1;
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    let id = this.#products[this.#products.length - 1].id + 1;
    return id;
  };

  getProducts = async () => {
    if (!fs.existsSync(this.#path)) {
      return [];
    } else {
      const data = await fsp.readFile(this.#path, "utf-8");
      if (data) {
        const products = JSON.parse(data);
        return products;
      }
    }
  };

  getProductById = (id) => {
    if (!fs.existsSync(this.#path)) {
      return console.log("No hay productos");
    }
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    let resultadoBusqueda = this.#products.filter((item) => item.id === id);
    if (resultadoBusqueda.length === 0)
      return console.log("No existe el producto");
    return resultadoBusqueda[0];
  };

  updateProducto = (id, campo, valor) => {
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.#products.find((item) => item.id === id))
      return console.log("No existe el producto");
    let props = Object.keys(this.#products[0]);
    if (!props.includes(campo)) return console.log("El campo no existe");
    this.#products.forEach((item) => {
      if (item.id === id) {
        item[campo] = valor;
        fs.writeFileSync(
          this.#path,
          JSON.stringify(this.#products, null, "\t")
        );
      }
    });
  };

  deleteProducto = (id) => {
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    if (!this.#products.find((item) => item.id === id))
      return console.log("No existe el producto");
    for (let i = 0; i < this.#products.length; i++) {
      if (this.#products[i].id === id) {
        this.#products.splice(i, 1);
      }
    }
    fs.writeFileSync(this.#path, JSON.stringify(this.#products, null, "\t"));
  };
}

const manager = new ProductManager();

console.log(manager.getProducts());

module.exports.fs = fs;
module.exports.filename = filename;
module.exports.manager = manager;

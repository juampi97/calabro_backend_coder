export default class CartModel {
  static get model() {
    return "carts";
  }

  static get schema() {
    return {
      products: {
        type: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "products",
            },
            qty: { type: Number, default: 1 },
          },
        ],
        default: [],
      },
    };
  }
}

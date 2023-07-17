export default class UserModel {
  static get model() {
    return "products";
  }

  static get schema() {
    return {
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true },
      code: { type: String, required: true },
      stock: { type: String, required: true },
      status: {
        type: Boolean,
        default: true,
      },
    };
  }
}

//productSchema.plugin(mongoosePaginate);


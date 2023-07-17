export default class MessageModel {
  static get model() {
    return "messages";
  }

  static get schema() {
    return {
      messages: {
        type: [
          {
            email: String,
            message: String,
          },
        ],
        default: [],
      },
    };
  }
}

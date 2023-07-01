import  chatManager  from "../dao/messagesManager.js";
import messageModel from "../model/mesagges.model.js";

export async function getChats (req, res) {
   clients++;
  if (clients == 1) {
    let result = await messageModel.create({
      messages: [],
    });
    let conversationID = result._id.toString();
     try {
       chatManager.setID(conversationID).then((id) => {
         console.log(id);
       });
     } catch (err) {
       console.log("Cannot get products with mongoose: " + err);
     }
  }
  res.render("chat", {});
}
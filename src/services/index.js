import MongoDAO from "../model/mongoDAO.js";
import UserService from "./user.sevices.js";
import config from "../config/config.js";

let dao;

switch (config.app.persistence){
    case "MONGO":
        dao = new MongoDAO(config.mongo);
        break;
}

const userService = new UserService(dao);

export default userService
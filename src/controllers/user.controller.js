import userService from "../services/index.js";

const getUsers = async (req, res, next) => {
    let result = await userService.get();
    res.send(result);
}

const saveUser = async (req, res, next) => {
    let result = await userService.save(req.body);
    res.send(result);
}

export default { getUsers, saveUser }
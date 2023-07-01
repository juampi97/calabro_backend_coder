import { Router } from "express";
import { getChats } from "../controllers/chat.controller.js";

const router = Router();

let clients = 0;

router.get("/", getChats);

export default router;

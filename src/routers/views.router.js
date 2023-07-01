import express from "express";
import { getCarts, main } from "../controllers/views.controller.js";

const router = express.Router();

router.get("/", main);

router.get("/carts/:cid", getCarts);

export default router;

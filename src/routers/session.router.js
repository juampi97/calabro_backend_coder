import { Router } from "express";
import {
  logout,
  getGitHubCallback,
  failLogin,
  postLogin,
  getLogin,
  failureRegister,
  postRegister,
  getRegister,
} from "../controllers/session.controller.js";
import passport from "passport";

const router = Router();

router.get("/register", getRegister);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/session/failureRegister",
  }),
  postRegister
);

router.get("/failureRegister", failureRegister);

router.get("/login", getLogin);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/session/failLogin" }),
  postLogin
);

router.get("/failLogin", failLogin);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/login" }),
  getGitHubCallback
);

router.get("/logout", logout);

export default router;

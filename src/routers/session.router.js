import { Router } from "express";
import userModel from "../model/user.model.js";
import { createHash, isValidPassword, JWT_COOKIE_NAME, generateToken } from "../utils.js";
import passport from "passport";
import { manager as cManager } from "../manager/db/cartsManager.js";

const router = Router();

router.get("/register", (req, res) => {
  if (req.cookies[JWT_COOKIE_NAME]) {
    res.redirect("/products");
  } else {
    res.render("sessions/register");
  }
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/session/failureRegister",
  }),
  async (req, res) => {
    res.redirect("/session/login");
  }
);

router.get("/failureRegister", (req, res) => {
  res.render("errors/base", {
    error: "No se pudo registrar el usuario, el email ya existe.",
  });
});

router.get("/login", (req, res) => {
  if (req.cookies[JWT_COOKIE_NAME]) {
    res.redirect("/products");
  } else {
    res.render("sessions/login");
  }
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/session/failLogin" }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Invalid credentials" });
    }
    cManager.addCart().then((data) => {
      if (data) {
        res.cookie(JWT_COOKIE_NAME, req.user.token).cookie("cartID", data.id).redirect("/products");
      }
    });
  }
);

router.get("/failLogin", (req, res) => {
  res.render("errors/base", {
    error: "No se pudo iniciar sesión. Usuario o contraseña incorrecto.",
  });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/session/login" }),
  async (req, res) => {
    cManager.addCart().then((data) => {
      if (data) {
        const token = generateToken(req.user);
        req.user.token = token;
        res.cookie(JWT_COOKIE_NAME, req.user.token).cookie("cartID", data.id).redirect("/products");
      }
    });
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie(JWT_COOKIE_NAME).clearCookie("cartID", {signed:true}).redirect("/session/login");
});

export default router;

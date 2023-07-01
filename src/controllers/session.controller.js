import userModel from "../model/user.model.js";
import {
  createHash,
  isValidPassword,
  JWT_COOKIE_NAME,
  generateToken,
} from "../utils.js";
import passport from "passport";
import { manager as cManager } from "../dao/cartsManager.js";

export function getRegister(req, res) {
  if (req.cookies[JWT_COOKIE_NAME]) {
    res.redirect("/products");
  } else {
    res.render("sessions/register");
  }
}

export async function postRegister(req, res) {
  res.redirect("/session/login");
}

export function failureRegister(req, res) {
  res.render("errors/base", {
    error: "No se pudo registrar el usuario, el email ya existe.",
  });
}

export function getLogin(req, res) {
  if (req.cookies[JWT_COOKIE_NAME]) {
    res.redirect("/products");
  } else {
    res.render("sessions/login");
  }
}

export async function postLogin(req, res) {
  if (!req.user) {
    return res
      .status(400)
      .send({ status: "error", error: "Invalid credentials" });
  }
  cManager.addCart(req.user.email).then((data) => {
    if (data) {
      res
        .cookie(JWT_COOKIE_NAME, req.user.token)
        .cookie("cartID", data.id)
        .redirect("/products");
    }
  });
}

export function failLogin(req, res) {
  res.render("errors/base", {
    error: "No se pudo iniciar sesión. Usuario o contraseña incorrecto.",
  });
}

export async function getGitHubCallback(req, res) {
  cManager.addCart(req.user.email).then((data) => {
    if (data) {
      const token = generateToken(req.user);
      req.user.token = token;
      res
        .cookie(JWT_COOKIE_NAME, req.user.token)
        .cookie("cartID", data.id)
        .redirect("/products");
    }
  });
}

export function logout(req, res) {
  res
    .clearCookie(JWT_COOKIE_NAME)
    .clearCookie("cartID", { signed: true })
    .redirect("/session/login");
}

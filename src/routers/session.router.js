import { Router } from "express";
import userModel from "../model/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.get("/register", (req, res) => {
  const email = req.session.email;
  if (email) {
    res.redirect("/products");
  } else {
    res.render("sessions/register");
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  let userNew = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  };
  const user = await userModel.create(userNew);
  await user.save();
  res.redirect("/");
});

router.get("/login", (req, res) => {
  const email = req.session.email;
  if (email) {
    res.redirect("/products");
  } else {
    res.render("sessions/login");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel
    .findOne({ email: email })
    .lean()
    .exec();
  if (!user) {
    return res
      .status(401)
      .render("errors/base", { error: "Invalid email or password" });
  }
  if(!isValidPassword(user, password)) {
    return res
      .status(401)
      .render("errors/base", { error: "Invalid email or password" });
  }
  req.session.email = user.email;
  res.redirect("/products");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("errors/base", { error: "Internal server error" });
    } else {
      res.redirect("/session/login");
    }
  });
});

export default router;

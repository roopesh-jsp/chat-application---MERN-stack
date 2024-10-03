const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

module.exports = authRoutes;

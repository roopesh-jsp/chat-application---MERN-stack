const express = require("express");
const { register } = require("../controllers/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/register", register);

module.exports = authRoutes;

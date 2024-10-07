const express = require("express");
const { register, login, getUsers } = require("../controllers/auth.controller");
const { protect } = require("../middleware/Protect");

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.get("/users", protect, getUsers);

module.exports = authRoutes;

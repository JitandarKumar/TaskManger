const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUserById
} = require("../controllers/userControllers");
const router = express.Router();

// User Managment Routes 
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);

module.exports = router;
const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/", pageController.getIndex);
router.get("/new", pageController.getNewMessage);
router.post("/new", pageController.postNewMessage);
router.get("/message/:id", pageController.getViewMessage);

module.exports = router;

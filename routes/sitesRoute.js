const express = require("express");
const siteController = require("../controller/siteController");

const router = express.Router();

router.get("/search", siteController.search);
router.get("/", siteController.home);

module.exports = router;

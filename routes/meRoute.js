const express = require("express");

const router = express.Router();

const meController = require("../controller/meController");

router.get("/stored/courses", meController.storedCourse);
router.get("/trash/courses", meController.trashCourse);

module.exports = router;

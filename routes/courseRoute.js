const express = require("express");

const router = express.Router({ mergeParams: true });

const courseController = require("../controller/courseController");

router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.post("/handle-form-action", courseController.handleFormAction);
router.post("/:id/delete", courseController.destroy);
router.post("/:id/forceDelete", courseController.forcedDestroy);
router.post("/:id/restore", courseController.restore);
router.get("/:id/edit", courseController.edit);
router.post("/:id", courseController.update);
router.get("/:slug", courseController.show);
module.exports = router;

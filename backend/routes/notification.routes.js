const router = require("express").Router();
const controller = require("../controllers/notification.controller");

router.get("/:userId", controller.getNotifications);
router.patch("/:id/read", controller.markAsRead);

module.exports = router;
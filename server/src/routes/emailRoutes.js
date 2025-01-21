// backend/routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const emailController = require("../controllers/emailController");

const upload = multer({ dest: "uploads/" });

router.get("/getEmailLayout", emailController.getEmailLayout);
router.post(
  "/uploadImage",
  upload.single("image"),
  emailController.uploadImage
);
router.post("/uploadEmailConfig", emailController.uploadEmailConfig);
router.post(
  "/renderAndDownloadTemplate",
  emailController.renderAndDownloadTemplate
);

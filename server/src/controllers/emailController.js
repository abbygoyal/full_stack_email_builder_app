// backend/controllers/emailController.js
const fs = require("fs").promises;
const path = require("path");
const EmailConfig = require("../models/EmailConfig");

const baseTemplate = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{{title}}</title><style>body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; } .logo { max-width: 200px; margin-bottom: 20px; } .content { line-height: 1.6; }</style></head><body><img src="{{logoUrl}}" alt="Logo" class="logo"><h1>{{title}}</h1><div class="content">{{body}}</div></body></html>`;

exports.getEmailLayout = async (req, res) => {
  try {
    res.send(baseTemplate);
  } catch (error) {
    console.error("Error fetching layout:", error);
    res.status(500).json({ error: "Failed to fetch email layout" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const file = req.file;
    const newPath = path.join(
      __dirname,
      "../uploads",
      `${Date.now()}-${file.originalname}`
    );
    await fs.rename(file.path, newPath);
    res.json({ imageUrl: `/uploads/${path.basename(newPath)}` });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

exports.uploadEmailConfig = async (req, res) => {
  try {
    const emailConfig = new EmailConfig(req.body);
    await emailConfig.save();
    res.json({ message: "Email config saved successfully" });
  } catch (error) {
    console.error("Error saving email config:", error);
    res.status(500).json({ error: "Failed to save email config" });
  }
};

exports.renderAndDownloadTemplate = async (req, res) => {
  try {
    const { title, body, logoUrl } = req.body;
    let rendered = baseTemplate;
    rendered = rendered.replace(/{{title}}/g, title);
    rendered = rendered.replace(/{{body}}/g, body);
    rendered = rendered.replace(/{{logoUrl}}/g, logoUrl);

    res.setHeader("Content-Type", "text/html");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=email-template.html"
    );
    res.send(rendered);
  } catch (error) {
    console.error("Error rendering template:", error);
    res.status(500).json({ error: "Failed to render template" });
  }
};

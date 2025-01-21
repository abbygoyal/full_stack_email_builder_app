import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Button from "./ui/button";
import Input from "./ui/input";
import Textarea from "./ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import "../styles/components.css";

const API_BASE_URL = "http://localhost:3001";

const EmailBuilder = () => {
  const [template, setTemplate] = useState("");
  const [emailConfig, setEmailConfig] = useState({
    title: "",
    body: "",
    logoUrl: "",
  });
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEmailLayout();
  }, []);

  const fetchEmailLayout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/getEmailLayout`);
      if (!response.ok) throw new Error("Failed to fetch email layout");
      const html = await response.text();
      setTemplate(html);
      setPreview(html);
    } catch (error) {
      console.error("Error fetching layout:", error);
      setError("Failed to load email layout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/uploadImage`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload image");
      const { imageUrl } = await response.json();
      setEmailConfig((prev) => ({
        ...prev,
        logoUrl: `${API_BASE_URL}${imageUrl}`,
      }));
      updatePreview({ ...emailConfig, logoUrl: `${API_BASE_URL}${imageUrl}` });
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedConfig = { ...emailConfig, [name]: value };
    setEmailConfig(updatedConfig);
    updatePreview(updatedConfig);
  };

  const updatePreview = (config = emailConfig) => {
    let updatedHtml = template;
    updatedHtml = updatedHtml.replace(/{{title}}/g, config.title || "");
    updatedHtml = updatedHtml.replace(/{{body}}/g, config.body || "");
    updatedHtml = updatedHtml.replace(/{{logoUrl}}/g, config.logoUrl || "");
    setPreview(updatedHtml);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/uploadEmailConfig`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailConfig),
      });
      if (!response.ok) throw new Error("Failed to save email configuration");
      alert("Email configuration saved successfully!");
    } catch (error) {
      console.error("Error saving config:", error);
      setError("Failed to save email configuration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/renderAndDownloadTemplate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailConfig),
        }
      );
      if (!response.ok) throw new Error("Failed to download template");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "email-template.html";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading template:", error);
      setError("Failed to download template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Email Builder</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Logo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block mb-2">Title</label>
              <Input
                name="title"
                value={emailConfig.title}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block mb-2">Body</label>
              <Textarea
                name="body"
                value={emailConfig.body}
                onChange={handleInputChange}
                rows={6}
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isLoading}>
                Save
              </Button>
              <Button onClick={handleDownload} disabled={isLoading}>
                <Upload className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border p-4 rounded"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailBuilder;

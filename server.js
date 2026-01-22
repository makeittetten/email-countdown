const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

/* Health check */
app.get("/", (req, res) => {
  res.send("OK – countdown server running");
});

/* Countdown image */
app.get("/countdown", (req, res) => {
  try {
    /* ======================
       SETTINGS
       ====================== */

    // Expiry via URL (milliseconds)
    const expiry = Number(req.query.expiry);
    if (!expiry || Number.isNaN(expiry)) {
      return res.status(400).send("Invalid or missing ?expiry= parameter");
    }

    // Size: 400 (default) or 600
    const size = req.query.size === "600" ? 600 : 400;

    const width = size;
    const height = size === 600 ? 120 : 80;

    // Layout tuning per size
    const numberFontSize = size === 600 ? 32 : 24;
    const labelFontSize = size === 600 ? 11 : 10;

    const numberY = size === 600 ? 45 : 28;
    const labelY = size === 600 ? 75 : 52;

    const brandColor = "#9CAA82";

    /* ======================
       TIME CALCULATION
       ====================== */
    const now = Date.now();
    let diff = expiry - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    const values = [
      String(days).padStart(2, "0"),
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0")
    ];

    const labels = ["TAGE", "STUNDEN", "MINUTEN", "SEKUNDEN"];

    /* ======================
       CANVAS
       ====================== */
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const colWidth = width / 4;

    // Numbers
    ctx.fillStyle = brandColor;
    ctx.font = `bold ${numberFontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    values.forEach((val, i) => {
      ctx.fillText(val, colWidth * (i + 0.5), numberY);
    });

    // Labels
    ctx.fillStyle = "#000000";
    ctx.font = `${labelFontSize}px sans-serif`;

    labels.forEach((label, i) => {
      ctx.fillText(label, colWidth * (i + 0.5), labelY);
    });

    /* ======================
       OUTPUT
       ====================== */
    const buffer = canvas.toBuffer("image/png");

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    });
    res.end(buffer);

  } catch (err) {
    console.error("Countdown error:", err);
    res.status(500).send("Internal Server Error");
  }
});

/* Start server */
app.listen(PORT, () => {
  console.log("✅ Countdown server running on port", PORT);
});

const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/countdown", (req, res) => {
  try {
    const expiry = Number(req.query.expiry);

    if (!expiry || Number.isNaN(expiry)) {
      return res.status(400).send("Invalid or missing ?expiry= parameter");
    }

    const now = Date.now();
    let diff = expiry - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    const canvas = createCanvas(600, 120);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 600, 120);

    // Text (safe font)
    ctx.fillStyle = "#82483a";
    ctx.font = "30px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text =
      `${String(days).padStart(2, "0")} : ` +
      `${String(hours).padStart(2, "0")} : ` +
      `${String(minutes).padStart(2, "0")} : ` +
      `${String(seconds).padStart(2, "0")}`;

    ctx.fillText(text, 300, 60);

    const buffer = canvas.toBuffer("image/png");

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(200).send(buffer);
  } catch (err) {
    console.error("Countdown error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("✅ Countdown server running on port", PORT);
});

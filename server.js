const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/countdown", (req, res) => {
  console.log("➡️ /countdown called");

  try {
    const expiry = Number(req.query.expiry);
    console.log("expiry param:", expiry);

    if (!expiry || Number.isNaN(expiry)) {
      console.log("❌ invalid expiry");
      return res.status(400).send("Invalid or missing ?expiry=");
    }

    const now = Date.now();
    let diff = expiry - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    console.log("time parts:", days, hours, minutes, seconds);

    const canvas = createCanvas(600, 120);
    const ctx = canvas.getContext("2d");

    // VERY BASIC rendering (no fonts that can crash)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 600, 120);

    ctx.fillStyle = "#82483a";
    ctx.font = "30px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text = `${days} : ${hours} : ${minutes} : ${seconds}`;
    ctx.fillText(text, 300, 60);

    const buffer = canvas.toBuffer("image/png");

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.status(200).send(buffer);

    console.log("✅ image sent");
  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("🚀 Countdown server running on port", PORT);
});

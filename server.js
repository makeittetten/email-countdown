const express = require("express");
const { createCanvas } = require("canvas");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/countdown", (req, res) => {
  const width = 600;
  const height = 120;

  const endDate = new Date("2026-01-23T15:30:00+01:00").getTime();
  const now = Date.now();
  let diff = endDate - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#82483a";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const text =
    `${String(days).padStart(2, "0")} : ` +
    `${String(hours).padStart(2, "0")} : ` +
    `${String(minutes).padStart(2, "0")} : ` +
    `${String(seconds).padStart(2, "0")}`;

  ctx.fillText(text, width / 2, height / 2);

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.send(buffer);
});

app.listen(PORT, () => {
  console.log("Countdown server running");
});

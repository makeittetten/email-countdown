const canvas = createCanvas(600, 180);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, 600, 180);

// Layout
const boxWidth = 120;
const boxHeight = 90;
const gap = 20;
const startX = 30;
const boxY = 30;

// Colors
const boxBorder = "#e0e0e0";
const textColor = "#82483a";

// Data
const values = [
  String(days).padStart(2, "0"),
  String(hours).padStart(2, "0"),
  String(minutes).padStart(2, "0"),
  String(seconds).padStart(2, "0")
];

const labels = ["TAGE", "STUNDEN", "MINUTEN", "SEKUNDEN"];

// Draw boxes
for (let i = 0; i < 4; i++) {
  const x = startX + i * (boxWidth + gap);

  // Box
  ctx.strokeStyle = boxBorder;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, boxY, boxWidth, boxHeight);

  // Number
  ctx.fillStyle = textColor;
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(values[i], x + boxWidth / 2, boxY + 32);

  // Label
  ctx.font = "12px sans-serif";
  ctx.fillText(labels[i], x + boxWidth / 2, boxY + 68);
}

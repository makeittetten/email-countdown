const canvas = createCanvas(600, 150);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, 600, 150);

// Layout
const colWidth = 600 / 4;
const numberY = 55;
const labelY = 95;

// Numbers
ctx.fillStyle = "#82483a";
ctx.font = "bold 32px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

ctx.fillText(String(days).padStart(2, "0"), colWidth * 0.5, numberY);
ctx.fillText(String(hours).padStart(2, "0"), colWidth * 1.5, numberY);
ctx.fillText(String(minutes).padStart(2, "0"), colWidth * 2.5, numberY);
ctx.fillText(String(seconds).padStart(2, "0"), colWidth * 3.5, numberY);

// Labels
ctx.font = "12px sans-serif";
ctx.fillStyle = "#82483a";

ctx.fillText("TAGE", colWidth * 0.5, labelY);
ctx.fillText("STUNDEN", colWidth * 1.5, labelY);
ctx.fillText("MINUTEN", colWidth * 2.5, labelY);
ctx.fillText("SEKUNDEN", colWidth * 3.5, labelY);

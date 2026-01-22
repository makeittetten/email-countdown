app.get("/countdown", (req, res) => {
  try {
    const expiry = Number(req.query.expiry);

    if (!expiry || Number.isNaN(expiry)) {
      return res.status(400).send("Invalid or missing ?expiry= parameter");
    }

    const now = Date.now();
    let diff = expiry - now;
    if (diff < 0) diff = 0; // <-- stays at 0 when expired

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

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

    // Fixed brand color
    const brandColor = "#9CAA82";
    const borderColor = "#e5e5e5";

    const values = [
      String(days).padStart(2, "0"),
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0")
    ];

    // German labels (fixed)
    const labels = ["TAGE", "STUNDEN", "MINUTEN", "SEKUNDEN"];

    for (let i = 0; i < 4; i++) {
      const x = startX + i * (boxWidth + gap);

      // Box
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, boxY, boxWidth, boxHeight);

      // Number
      ctx.fillStyle = brandColor;
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(values[i], x + boxWidth / 2, boxY + 34);

      // Label
      ctx.font = "12px sans-serif";
      ctx.fillText(labels[i], x + boxWidth / 2, boxY + 68);
    }

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

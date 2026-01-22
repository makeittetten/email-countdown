app.get("/countdown", (req, res) => {
  try {
    const expiry = Number(req.query.expiry);

    if (!expiry || isNaN(expiry)) {
      res.status(400).send("Invalid or missing ?expiry= parameter");
      return;
    }

    const width = 600;
    const height = 120;

    const now = Date.now();
    let diff = expiry - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Text
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
    res.status(200).send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

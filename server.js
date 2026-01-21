{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import express from "express";\
import \{ createCanvas \} from "canvas";\
\
const app = express();\
const PORT = process.env.PORT || 3000;\
\
app.get("/countdown", (req, res) => \{\
  const width = 600;\
  const height = 120;\
\
  // End date \'96 Berlin time\
  const endDate = new Date("2026-01-23T15:30:00+01:00").getTime();\
  const now = Date.now();\
  let diff = endDate - now;\
  if (diff < 0) diff = 0;\
\
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));\
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);\
  const minutes = Math.floor((diff / (1000 * 60)) % 60);\
  const seconds = Math.floor((diff / 1000) % 60);\
\
  const canvas = createCanvas(width, height);\
  const ctx = canvas.getContext("2d");\
\
  // Background\
  ctx.fillStyle = "#ffffff";\
  ctx.fillRect(0, 0, width, height);\
\
  // Text\
  ctx.fillStyle = "#82483a";\
  ctx.font = "bold 32px Arial";\
  ctx.textAlign = "center";\
  ctx.textBaseline = "middle";\
\
  const text =\
    `$\{String(days).padStart(2, "0")\} : ` +\
    `$\{String(hours).padStart(2, "0")\} : ` +\
    `$\{String(minutes).padStart(2, "0")\} : ` +\
    `$\{String(seconds).padStart(2, "0")\}`;\
\
  ctx.fillText(text, width / 2, height / 2);\
\
  const buffer = canvas.toBuffer("image/png");\
\
  res.setHeader("Content-Type", "image/png");\
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");\
  res.send(buffer);\
\});\
\
app.listen(PORT, () => \{\
  console.log(`Countdown server running on port $\{PORT\}`);\
\});\
}
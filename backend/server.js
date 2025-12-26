import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import invoiceRoutes from "./routes/invoiceRoutes.js";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/invoices", invoiceRoutes);

/* ---------- ROOT CHECK ---------- */
app.get("/", (req, res) => {
  res.send("SVTL Billing System Backend Running");
});

/* ---------- DATABASE ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

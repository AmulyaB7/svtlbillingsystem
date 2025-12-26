import express from "express";
import Invoice from "../models/invoice.js";
import Counter from "../models/Counter.js";

const router = express.Router();

/* CREATE INVOICE */
router.post("/", async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: "invoice" });
    if (!counter) {
      counter = await Counter.create({ name: "invoice", value: 1 });
    } else {
      counter.value += 1;
      await counter.save();
    }

    const invoiceNo = `SV/HO/${String(counter.value).padStart(4, "0")}`;

    const invoice = new Invoice({
      ...req.body,
      invoiceNo,
      invoiceDate: new Date(),
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET HISTORY */
router.get("/", async (req, res) => {
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  res.json(invoices);
});

export default router;

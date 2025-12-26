import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: String,

    customer: {
      name: String,
      phone: String,
      address: String,
      gstin: String,
      placeOfSupply: String,
    },

    device: {
      model: String,
      color: String,
      imei: String,
      issue: String,
    },

    service: {
      description: String,
      hsn: String,
      rate: Number,
    },

    payment: {
      method: String,
      salesperson: String,
      notes: String,
    },

    subtotal: Number,
    cgst: Number,
    sgst: Number,
    total: Number,

    invoiceDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);

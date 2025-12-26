import { useState } from "react";
import { saveInvoice } from "../api";
import InvoicePreview from "./InvoicePreview";

export default function InvoiceSummary({ customer, device, amount }) {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [salesperson, setSalesperson] = useState("");

  const cgst = amount * 0.09;
  const sgst = amount * 0.09;
  const total = amount + cgst + sgst;

  const save = async () => {
    await saveInvoice({
      customer,
      device,
      service: {
        description: "Service",
        hsn: "85171300",
        rate: amount,
      },
      payment: {
        method: paymentMethod,
        salesperson,
      },
      subtotal: amount,
      cgst,
      sgst,
      total,
    });

    alert("Invoice saved successfully");
  };

  return (
    <>
      <div className="bg-white border rounded-xl p-6 grid grid-cols-2 gap-4">
        <select
          className="border p-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
        </select>

        <input
          placeholder="Salesperson"
          className="border p-2"
          onChange={(e) => setSalesperson(e.target.value)}
        />
      </div>

      <div className="bg-white border rounded-xl p-6 text-right">
        <p>Subtotal: ₹{amount}</p>
        <p>CGST: ₹{cgst.toFixed(2)}</p>
        <p>SGST: ₹{sgst.toFixed(2)}</p>
        <p className="font-bold">Total: ₹{total.toFixed(2)}</p>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={save} className="border px-4 py-2 rounded">
          Save Only
        </button>
        <button
          onClick={() => {
            save();
            setOpen(true);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Preview & Print
        </button>
      </div>

      <InvoicePreview
        open={open}
        onClose={() => setOpen(false)}
        amount={amount}
        total={total}
      />
    </>
  );
}

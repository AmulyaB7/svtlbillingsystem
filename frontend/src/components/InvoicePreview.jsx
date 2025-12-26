import html2pdf from "html2pdf.js";

export default function InvoicePreview({
  open,
  onClose,
  customer = {},
  device = {},
  amount = 0,
  total = 0,
  paymentMethod = "",
  salesperson = "",
}) {
  if (!open) return null;

  const printInvoice = () => {
    window.print();
  };

  const downloadPDF = () => {
    const element = document.getElementById("invoice-print");

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "invoice.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4" },
      })
      .save();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white w-[850px] rounded shadow-lg">

        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="font-semibold">Invoice Preview</h2>
          <div className="space-x-2">
            <button
              onClick={downloadPDF}
              className="border px-3 py-1 rounded"
            >
              Download PDF
            </button>
            <button
              onClick={printInvoice}
              className="border px-3 py-1 rounded"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="border px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>

        {/* Printable Invoice */}
        <div id="invoice-print" className="p-6 text-sm">
          <h1 className="text-center text-xl font-bold">
            Sri Vijayalakshmi Telelinks
          </h1>
          <p className="text-center text-xs mb-4">
            MI Authorized Service Center • Karnataka
          </p>

          <div className="flex justify-between text-xs mb-3">
            <div>
              <p><b>Customer:</b> {customer.name}</p>
              <p><b>Phone:</b> {customer.phone}</p>
            </div>
            <div>
              <p><b>Date:</b> {new Date().toLocaleDateString()}</p>
              <p><b>Payment:</b> {paymentMethod}</p>
            </div>
          </div>

          <table className="w-full border text-xs mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Description</th>
                <th className="border p-2">HSN</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Service</td>
                <td className="border p-2">85171300</td>
                <td className="border p-2">₹{amount}</td>
                <td className="border p-2">₹{amount}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-right text-sm">
            <p>Subtotal: ₹{amount}</p>
            <p>CGST (9%): ₹{(amount * 0.09).toFixed(2)}</p>
            <p>SGST (9%): ₹{(amount * 0.09).toFixed(2)}</p>
            <p className="font-semibold text-base">
              Net Total: ₹{total.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 text-xs">
            <p><b>Salesperson:</b> {salesperson}</p>
          </div>

          <p className="text-center text-xs mt-6">
            Thank you for choosing us 🙏
          </p>
        </div>
      </div>
    </div>
  );
}

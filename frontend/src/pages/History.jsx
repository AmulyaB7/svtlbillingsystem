import { useEffect, useState } from "react";
import { getInvoices } from "../api";

export default function History() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await getInvoices();
      setInvoices(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const filtered = invoices.filter((inv) => {
    const q = search.toLowerCase();
    return (
      inv.invoiceNo?.toLowerCase().includes(q) ||
      inv.customer?.name?.toLowerCase().includes(q) ||
      inv.customer?.phone?.includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Invoice History</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by invoice no, customer name or phone…"
          className="w-full border rounded-md px-4 py-2 mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading invoices…</p>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500">No invoices found</p>
        )}

        {/* List */}
        <div className="space-y-4">
          {filtered.map((inv) => (
            <div
              key={inv._id}
              className="bg-white border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-semibold">
                    {inv.invoiceNo}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    paid
                  </span>
                </div>

                <p className="font-medium mt-1">
                  {inv.customer?.name || "—"}
                </p>
                <p className="text-sm text-gray-500">
                  {inv.customer?.phone}
                </p>
                <p className="text-sm text-gray-500">
                  {inv.device?.model} • IMEI: {inv.device?.imei}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-lg">
                  ₹{inv.total?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(inv.invoiceDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

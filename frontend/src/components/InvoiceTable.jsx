import { useState } from "react";

export default function InvoiceTable({ onChange }) {
  const [rate, setRate] = useState(0);

  const services = {
    "MOBILE SALE": 27000,
    "Screen Replacement": 3500,
    "Battery Replacement": 1800,
    "Charging Port Repair": 1200,
  };

  const selectService = (name) => {
    const value = services[name];
    setRate(value);
    onChange(value);
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Service Items</h2>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.keys(services).map((service) => (
          <button
            key={service}
            onClick={() => selectService(service)}
            className="px-3 py-1 text-sm border rounded-full hover:bg-gray-100"
          >
            {service}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Input label="Description" value="Service" readOnly />
        <Input label="HSN/SAC" value="85171300" readOnly />
        <Input
          label="Rate (₹)"
          type="number"
          value={rate}
          onChange={(e) => {
            const val = Number(e.target.value);
            setRate(val);
            onChange(val);
          }}
        />
        <Input label="Amount" value={`₹${rate}`} readOnly />
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white"
      />
    </div>
  );
}

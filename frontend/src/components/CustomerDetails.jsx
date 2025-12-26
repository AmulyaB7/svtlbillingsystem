export default function CustomerDetails({ onChange }) {
  const update = (field, value) => {
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-4">Customer Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Name *" onChange={(e) => update("name", e.target.value)} />
        <Input label="Phone *" onChange={(e) => update("phone", e.target.value)} />
      </div>

      <Textarea
        label="Address *"
        onChange={(e) => update("address", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <Input label="GSTIN" onChange={(e) => update("gstin", e.target.value)} />
        <Input label="Place of Supply" value="29 Karnataka" readOnly />
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input {...props} className="w-full border px-3 py-2 rounded" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="mt-4">
      <label className="text-sm">{label}</label>
      <textarea {...props} className="w-full border px-3 py-2 rounded" />
    </div>
  );
}

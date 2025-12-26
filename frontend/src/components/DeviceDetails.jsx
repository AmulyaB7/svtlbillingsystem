export default function DeviceDetails({ onChange }) {
  const update = (field, value) => {
    onChange((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-4">Device Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Model" onChange={(e) => update("model", e.target.value)} />
        <Input label="Color" onChange={(e) => update("color", e.target.value)} />
        <Input label="IMEI" onChange={(e) => update("imei", e.target.value)} />
        <Input label="Issue" onChange={(e) => update("issue", e.target.value)} />
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

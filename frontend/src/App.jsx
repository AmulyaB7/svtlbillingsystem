import { useState } from "react";
import Header from "./components/Header";
import CustomerDetails from "./components/CustomerDetails";
import DeviceDetails from "./components/DeviceDetails";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceSummary from "./components/InvoiceSummary";

export default function App() {
  const [customer, setCustomer] = useState({});
  const [device, setDevice] = useState({});
  const [serviceAmount, setServiceAmount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <CustomerDetails onChange={setCustomer} />
        <DeviceDetails onChange={setDevice} />
        <InvoiceTable onChange={setServiceAmount} />
        <InvoiceSummary
          customer={customer}
          device={device}
          amount={serviceAmount}
        />
      </div>
    </div>
  );
}

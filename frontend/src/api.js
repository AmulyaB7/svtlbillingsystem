const API_URL = "http://localhost:5000/api/invoices";

export const saveInvoice = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getInvoices = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

import { useRouter } from "next/router";
import { useState } from "react";
import Form from "./Form";

function AddCustomerPage() {
  const [form, setForm] = useState({
    companyName: "",
    industry: "other",
    website: "",
    logoUrl: "",
    tier: "project-based",
    status: "prospect",
    monthlyRetainerValue: 0,
    onboardedDate: "",
    notes: "",
  });

  const router = useRouter();

  const saveHandler = async () => {
    const res = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify({ data: form }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") router.push("/");
  };

  const cancelHandler = () => {
    setForm({
      companyName: "",
      industry: "other",
      website: "",
      logoUrl: "",
      tier: "project-based",
      status: "prospect",
      monthlyRetainerValue: 0,
      onboardedDate: "",
      notes: "",
    });
    router.push("/");
  };

  return (
    <div className="py-6 animate-fade-in">
      <div className="card">
        <h1 className="text-3xl font-bold text-slate-100 mb-6">
          Add New Client
        </h1>
        <Form form={form} setForm={setForm} />
        <div className="flex gap-3 mt-8 justify-end">
          <button className="btn btn-secondary" onClick={cancelHandler}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={saveHandler}>
            Save Client
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerPage;

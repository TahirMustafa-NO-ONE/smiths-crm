import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../module/Form";

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
    <div className="customer-page">
      <h4>Add New Client</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="second" onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddCustomerPage;

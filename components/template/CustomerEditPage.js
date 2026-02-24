import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import Form from "../module/Form";

function CustomerEditPage({ data, id }) {
  const onboardedDate = data.onboardedDate ? moment(data.onboardedDate).utc().format("YYYY-MM-DD") : "";

  const [form, setForm] = useState({
    companyName: data.companyName,
    industry: data.industry || "other",
    website: data.website || "",
    logoUrl: data.logoUrl || "",
    tier: data.tier,
    status: data.status,
    monthlyRetainerValue: data.monthlyRetainerValue || 0,
    onboardedDate: onboardedDate,
    notes: data.notes || "",
  });

  const router = useRouter();

  const saveHandler = async () => {
    const res = await fetch(`/api/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: form }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") router.push("/");
  };

  const cancelHandler = () => {
    router.push("/");
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      <div className="card">
        <h1 className="text-3xl font-bold text-slate-100 mb-6">
          Edit Client
        </h1>
        <Form form={form} setForm={setForm} />
        <div className="flex gap-3 mt-8 justify-end">
          <button className="btn btn-secondary" onClick={cancelHandler}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={saveHandler}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerEditPage;

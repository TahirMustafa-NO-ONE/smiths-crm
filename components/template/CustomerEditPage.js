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
    <div className="customer-page">
      <h4>Edit Client</h4>
      <Form form={form} setForm={setForm} />
      <div className="customer-page__buttons">
        <button className="first" onClick={cancelHandler}>
          Cancel
        </button>
        <button className="second" onClick={saveHandler}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default CustomerEditPage;

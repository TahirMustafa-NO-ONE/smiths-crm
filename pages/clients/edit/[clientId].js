import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function EditClientPage() {
  const [form, setForm] = useState({
    companyName: "",
    industry: "other",
    website: "",
    logoUrl: "",
    tier: "project-based",
    status: "prospect",
    assignedAccountManager: "",
    monthlyRetainerValue: 0,
    onboardedDate: "",
    notes: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { clientId } = router.query;

  useEffect(() => {
    if (clientId) {
      fetchClient();
      fetchTeamMembers();
    }
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/client/${clientId}`);
      const data = await res.json();
      if (data.status === "success") {
        const client = data.data;
        setForm({
          companyName: client.companyName || "",
          industry: client.industry || "other",
          website: client.website || "",
          logoUrl: client.logoUrl || "",
          tier: client.tier || "project-based",
          status: client.status || "prospect",
          assignedAccountManager: client.assignedAccountManager?._id || "",
          monthlyRetainerValue: client.monthlyRetainerValue || 0,
          onboardedDate: client.onboardedDate ? client.onboardedDate.split('T')[0] : "",
          notes: client.notes || "",
        });
      }
    } catch (error) {
      console.error("Error fetching client:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (data.status === "success") {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveHandler = async () => {
    if (!form.companyName || !form.tier) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/client/${clientId}`, {
        method: "PUT",
        body: JSON.stringify({ data: form }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push(`/clients/${clientId}`);
      } else {
        alert("Failed to update client");
      }
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Error updating client");
    } finally {
      setSaving(false);
    }
  };

  const cancelHandler = () => {
    router.push(`/clients/${clientId}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="spinner w-8 h-8" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        <div className="card max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">
            Edit Client
          </h1>

          <div className="space-y-5">
            <div>
              <label htmlFor="companyName" className="label">
                Company Name <span className="text-danger-400">*</span>
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={form.companyName}
                onChange={changeHandler}
                className="input"
                placeholder="Enter company name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="industry" className="label">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={form.industry}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="other">Other</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="SaaS">SaaS</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>

              <div>
                <label htmlFor="tier" className="label">
                  Tier <span className="text-danger-400">*</span>
                </label>
                <select
                  id="tier"
                  name="tier"
                  value={form.tier}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="retainer">Retainer</option>
                  <option value="project-based">Project-Based</option>
                  <option value="one-time">One-Time</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="status" className="label">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="prospect">Prospect</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label htmlFor="assignedAccountManager" className="label">
                  Account Manager
                </label>
                <select
                  id="assignedAccountManager"
                  name="assignedAccountManager"
                  value={form.assignedAccountManager}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="website" className="label">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={changeHandler}
                  className="input"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="logoUrl" className="label">
                  Logo URL
                </label>
                <input
                  id="logoUrl"
                  name="logoUrl"
                  type="url"
                  value={form.logoUrl}
                  onChange={changeHandler}
                  className="input"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="monthlyRetainerValue" className="label">
                  Monthly Retainer Value ($)
                </label>
                <input
                  id="monthlyRetainerValue"
                  name="monthlyRetainerValue"
                  type="number"
                  value={form.monthlyRetainerValue}
                  onChange={changeHandler}
                  className="input"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="onboardedDate" className="label">
                  Onboarded Date
                </label>
                <input
                  id="onboardedDate"
                  name="onboardedDate"
                  type="date"
                  value={form.onboardedDate}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="label">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={changeHandler}
                className="input"
                rows="4"
                placeholder="Add any additional notes..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8 justify-end">
            <button 
              className="btn btn-secondary" 
              onClick={cancelHandler}
              disabled={saving}
            >
              Cancel
            </button>
            <button 
              className="btn btn-success" 
              onClick={saveHandler}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditClientPage;

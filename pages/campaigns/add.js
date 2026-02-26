import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function AddCampaignPage() {
  const [form, setForm] = useState({
    name: "",
    client: "",
    type: "Email Marketing",
    status: "Planning",
    budget: 0,
    spend: 0,
    startDate: "",
    endDate: "",
    platform: "Multiple",
    goal: "",
    kpis: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
    },
    notes: "",
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/client");
      const data = await res.json();
      if (data.status === "success") {
        setClients(data.data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const kpiChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      kpis: {
        ...form.kpis,
        [name]: Number(value),
      },
    });
  };

  const calculateCTR = () => {
    if (form.kpis.impressions === 0) return 0;
    return ((form.kpis.clicks / form.kpis.impressions) * 100).toFixed(2);
  };

  const saveHandler = async () => {
    if (!form.name || !form.client || !form.type) {
      alert("Please fill in all required fields (Name, Client, and Type)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/campaign", {
        method: "POST",
        body: JSON.stringify({ data: form }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/campaigns");
      } else {
        alert("Failed to create campaign");
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
      alert("Error saving campaign");
    } finally {
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    router.push("/campaigns");
  };

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        <div className="card max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">
            Add New Campaign
          </h1>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="label">
                Campaign Name <span className="text-danger-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={changeHandler}
                className="input"
                placeholder="Enter campaign name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="client" className="label">
                  Client <span className="text-danger-400">*</span>
                </label>
                <select
                  id="client"
                  name="client"
                  value={form.client}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="type" className="label">
                  Campaign Type <span className="text-danger-400">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="Email Marketing">Email Marketing</option>
                  <option value="Social Media">Social Media</option>
                  <option value="PPC">PPC</option>
                  <option value="Content Marketing">Content Marketing</option>
                  <option value="SEO">SEO</option>
                  <option value="Other">Other</option>
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
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label htmlFor="platform" className="label">
                  Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={form.platform}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="Google Ads">Google Ads</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Email">Email</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="startDate" className="label">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={changeHandler}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="label">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="budget" className="label">
                  Budget ($)
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  value={form.budget}
                  onChange={changeHandler}
                  className="input"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label htmlFor="spend" className="label">
                  Actual Spend ($)
                </label>
                <input
                  id="spend"
                  name="spend"
                  type="number"
                  value={form.spend}
                  onChange={changeHandler}
                  className="input"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label htmlFor="goal" className="label">
                Goal / Objective
              </label>
              <textarea
                id="goal"
                name="goal"
                value={form.goal}
                onChange={changeHandler}
                className="input"
                rows="3"
                placeholder="Describe the campaign goals and objectives..."
              />
            </div>

            {/* KPIs Section */}
            <div className="border border-slate-700 rounded-lg p-5 bg-slate-800/30">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                Key Performance Indicators (KPIs)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="impressions" className="label">
                    Impressions
                  </label>
                  <input
                    id="impressions"
                    name="impressions"
                    type="number"
                    value={form.kpis.impressions}
                    onChange={kpiChangeHandler}
                    className="input"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="clicks" className="label">
                    Clicks
                  </label>
                  <input
                    id="clicks"
                    name="clicks"
                    type="number"
                    value={form.kpis.clicks}
                    onChange={kpiChangeHandler}
                    className="input"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="conversions" className="label">
                    Conversions
                  </label>
                  <input
                    id="conversions"
                    name="conversions"
                    type="number"
                    value={form.kpis.conversions}
                    onChange={kpiChangeHandler}
                    className="input"
                    placeholder="0"
                    min="0"
                  />
                </div>

                <div>
                  <label htmlFor="ctr" className="label">
                    CTR (Click-Through Rate)
                  </label>
                  <div className="input bg-slate-700/50 cursor-not-allowed flex items-center">
                    <span className="text-slate-300 font-semibold">
                      {calculateCTR()}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Auto-calculated: (Clicks / Impressions) × 100
                  </p>
                </div>
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={saveHandler}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Campaign"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddCampaignPage;

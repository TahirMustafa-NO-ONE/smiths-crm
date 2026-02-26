import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function AddLeadPage() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    source: "inbound",
    serviceInterestedIn: "",
    estimatedValue: 0,
    stage: "new",
    followUpDate: "",
    notes: "",
    assignedTo: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

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
    if (!form.companyName || !form.contactName || !form.email || !form.source) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: JSON.stringify({ data: form }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/leads");
      } else {
        alert("Failed to create lead");
      }
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Error saving lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        <div className="card max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">
            Add New Lead
          </h1>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                />
              </div>
              <div>
                <label htmlFor="contactName" className="label">
                  Contact Name <span className="text-danger-400">*</span>
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  value={form.contactName}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="label">
                  Email <span className="text-danger-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="phone" className="label">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="source" className="label">
                  Source <span className="text-danger-400">*</span>
                </label>
                <select
                  id="source"
                  name="source"
                  value={form.source}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="referral">Referral</option>
                  <option value="cold outreach">Cold Outreach</option>
                  <option value="inbound">Inbound</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="event">Event</option>
                </select>
              </div>
              <div>
                <label htmlFor="stage" className="label">
                  Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  value={form.stage}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal-sent">Proposal Sent</option>
                  <option value="negotiating">Negotiating</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="estimatedValue" className="label">
                  Estimated Value ($)
                </label>
                <input
                  id="estimatedValue"
                  name="estimatedValue"
                  type="number"
                  value={form.estimatedValue}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="followUpDate" className="label">
                  Follow Up Date
                </label>
                <input
                  id="followUpDate"
                  name="followUpDate"
                  type="date"
                  value={form.followUpDate}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="serviceInterestedIn" className="label">
                  Service Interested In
                </label>
                <input
                  id="serviceInterestedIn"
                  name="serviceInterestedIn"
                  type="text"
                  value={form.serviceInterestedIn}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="assignedTo" className="label">
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={form.assignedTo}
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
              onClick={() => router.push("/leads")}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              className="btn btn-success" 
              onClick={saveHandler}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddLeadPage;

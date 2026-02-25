import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function EditLeadPage() {
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { leadId } = router.query;

  useEffect(() => {
    if (leadId) {
      fetchLead();
      fetchTeamMembers();
    }
  }, [leadId]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/lead/${leadId}`);
      const data = await res.json();
      if (data.status === "success") {
        const lead = data.data;
        setForm({
          companyName: lead.companyName || "",
          contactName: lead.contactName || "",
          email: lead.email || "",
          phone: lead.phone || "",
          source: lead.source || "inbound",
          serviceInterestedIn: lead.serviceInterestedIn || "",
          estimatedValue: lead.estimatedValue || 0,
          stage: lead.stage || "new",
          followUpDate: lead.followUpDate ? lead.followUpDate.split('T')[0] : "",
          notes: lead.notes || "",
          assignedTo: lead.assignedTo?._id || "",
        });
      }
    } catch (error) {
      console.error("Error fetching lead:", error);
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
    if (!form.companyName || !form.contactName || !form.email || !form.source) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/lead/${leadId}`, {
        method: "PUT",
        body: JSON.stringify({ data: form }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push(`/leads/${leadId}`);
      } else {
        alert("Failed to update lead");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Error updating lead");
    } finally {
      setSaving(false);
    }
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
            Edit Lead
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
              onClick={() => router.push(`/leads/${leadId}`)}
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

export default EditLeadPage;

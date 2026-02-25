import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function EditContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    client: "",
    isPrimary: false,
    linkedInUrl: "",
    preferredContact: "email",
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { contactId } = router.query;

  useEffect(() => {
    if (contactId) {
      fetchContact();
      fetchClients();
    }
  }, [contactId]);

  const fetchContact = async () => {
    try {
      const res = await fetch(`/api/contact/${contactId}`);
      const data = await res.json();
      if (data.status === "success") {
        const contact = data.data;
        setForm({
          firstName: contact.firstName || "",
          lastName: contact.lastName || "",
          email: contact.email || "",
          phone: contact.phone || "",
          jobTitle: contact.jobTitle || "",
          client: contact.client?._id || "",
          isPrimary: contact.isPrimary || false,
          linkedInUrl: contact.linkedInUrl || "",
          preferredContact: contact.preferredContact || "email",
        });
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    } finally {
      setLoading(false);
    }
  };

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
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const saveHandler = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.client) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/contact/${contactId}`, {
        method: "PUT",
        body: JSON.stringify({ data: form }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push(`/contacts/${contactId}`);
      } else {
        alert("Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Error updating contact");
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
            Edit Contact
          </h1>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="label">
                  First Name <span className="text-danger-400">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="label">
                  Last Name <span className="text-danger-400">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
            </div>

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
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.companyName}
                  </option>
                ))}
              </select>
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
                <label htmlFor="jobTitle" className="label">
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={form.jobTitle}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="preferredContact" className="label">
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={form.preferredContact}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="linkedInUrl" className="label">
                LinkedIn URL
              </label>
              <input
                id="linkedInUrl"
                name="linkedInUrl"
                type="url"
                value={form.linkedInUrl}
                onChange={changeHandler}
                className="input"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="isPrimary"
                name="isPrimary"
                type="checkbox"
                checked={form.isPrimary}
                onChange={changeHandler}
                className="w-5 h-5"
              />
              <label htmlFor="isPrimary" className="text-slate-300 cursor-pointer">
                Mark as primary contact for this client
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-8 justify-end">
            <button 
              className="btn btn-secondary" 
              onClick={() => router.push(`/contacts/${contactId}`)}
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

export default EditContactPage;

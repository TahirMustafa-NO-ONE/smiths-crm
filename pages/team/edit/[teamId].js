import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function EditTeamMemberPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Account Manager",
    skills: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { teamId } = router.query;

  useEffect(() => {
    if (teamId) {
      fetchMember();
    }
  }, [teamId]);

  const fetchMember = async () => {
    try {
      const res = await fetch(`/api/team/${teamId}`);
      const data = await res.json();
      if (data.status === "success") {
        const member = data.data;
        setForm({
          name: member.name || "",
          email: member.email || "",
          role: member.role || "Account Manager",
          skills: member.skills ? member.skills.join(', ') : "",
          avatarUrl: member.avatarUrl || "",
        });
      }
    } catch (error) {
      console.error("Error fetching team member:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveHandler = async () => {
    if (!form.name || !form.email || !form.role) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = {
      ...form,
      skills: form.skills ? form.skills.split(',').map(s => s.trim()) : [],
    };

    setSaving(true);
    try {
      const res = await fetch(`/api/team/${teamId}`, {
        method: "PUT",
        body: JSON.stringify({ data: formData }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push(`/team/${teamId}`);
      } else {
        alert("Failed to update team member");
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      alert("Error updating team member");
    } finally {
      setSaving(false);
    }
  };

  const cancelHandler = () => {
    router.push(`/team/${teamId}`);
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
            Edit Team Member
          </h1>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="label">
                Full Name <span className="text-danger-400">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={changeHandler}
                className="input"
                placeholder="John Doe"
              />
            </div>

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
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="role" className="label">
                Role <span className="text-danger-400">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={changeHandler}
                className="select"
              >
                <option value="Account Manager">Account Manager</option>
                <option value="Designer">Designer</option>
                <option value="Copywriter">Copywriter</option>
                <option value="Media Buyer">Media Buyer</option>
                <option value="SEO Specialist">SEO Specialist</option>
                <option value="Developer">Developer</option>
              </select>
            </div>

            <div>
              <label htmlFor="skills" className="label">
                Skills (comma-separated)
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                value={form.skills}
                onChange={changeHandler}
                className="input"
                placeholder="SEO, Content Marketing, Google Analytics"
              />
              <p className="text-sm text-slate-400 mt-1">
                Enter skills separated by commas
              </p>
            </div>

            <div>
              <label htmlFor="avatarUrl" className="label">
                Avatar URL
              </label>
              <input
                id="avatarUrl"
                name="avatarUrl"
                type="url"
                value={form.avatarUrl}
                onChange={changeHandler}
                className="input"
                placeholder="https://example.com/avatar.jpg"
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

export default EditTeamMemberPage;

import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function EditProjectPage() {
  const [form, setForm] = useState({
    title: "",
    type: "Design",
    client: "",
    status: "Planning",
    startDate: "",
    deadline: "",
    budget: 0,
    actualSpend: 0,
    assignedTeamMembers: [],
    deliverables: "",
    notes: "",
  });
  const [clients, setClients] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchClients();
      fetchTeamMembers();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/project/${projectId}`);
      const data = await res.json();
      if (data.status === "success") {
        const project = data.data;
        setForm({
          title: project.title || "",
          type: project.type || "Design",
          client: project.client?._id || "",
          status: project.status || "Planning",
          startDate: project.startDate
            ? project.startDate.split("T")[0]
            : "",
          deadline: project.deadline ? project.deadline.split("T")[0] : "",
          budget: project.budget || 0,
          actualSpend: project.actualSpend || 0,
          assignedTeamMembers:
            project.assignedTeamMembers?.map((m) => m._id || m) || [],
          deliverables: Array.isArray(project.deliverables)
            ? project.deliverables.join(", ")
            : "",
          notes: project.notes || "",
        });
      }
    } catch (error) {
      console.error("Error fetching project:", error);
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

  const handleTeamMembersChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setForm({ ...form, assignedTeamMembers: selected });
  };

  const saveHandler = async () => {
    if (!form.title || !form.type || !form.client) {
      alert("Please fill in all required fields (Title, Type, and Client)");
      return;
    }

    setSaving(true);
    try {
      // Convert deliverables from comma-separated string to array
      const deliverablesArray = form.deliverables
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d.length > 0);

      const projectData = {
        ...form,
        deliverables: deliverablesArray,
      };

      const res = await fetch(`/api/project/${projectId}`, {
        method: "PUT",
        body: JSON.stringify({ data: projectData }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push(`/projects/${projectId}`);
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project");
    } finally {
      setSaving(false);
    }
  };

  const cancelHandler = () => {
    router.push(`/projects/${projectId}`);
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
            Edit Project
          </h1>

          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="label">
                Project Title <span className="text-danger-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={changeHandler}
                className="input"
                placeholder="Enter project title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="type" className="label">
                  Project Type <span className="text-danger-400">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Content">Content</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Social Media">Social Media</option>
                  <option value="SEO">SEO</option>
                </select>
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
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.companyName}
                    </option>
                  ))}
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
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label htmlFor="assignedTeamMembers" className="label">
                  Assigned Team Members
                </label>
                <select
                  id="assignedTeamMembers"
                  name="assignedTeamMembers"
                  multiple
                  value={form.assignedTeamMembers}
                  onChange={handleTeamMembersChange}
                  className="select"
                  size="4"
                >
                  {teamMembers.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Hold Ctrl/Cmd to select multiple
                </p>
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
                <label htmlFor="deadline" className="label">
                  Deadline
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={form.deadline}
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
                <label htmlFor="actualSpend" className="label">
                  Actual Spend ($)
                </label>
                <input
                  id="actualSpend"
                  name="actualSpend"
                  type="number"
                  value={form.actualSpend}
                  onChange={changeHandler}
                  className="input"
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label htmlFor="deliverables" className="label">
                Deliverables
              </label>
              <textarea
                id="deliverables"
                name="deliverables"
                value={form.deliverables}
                onChange={changeHandler}
                className="input"
                rows="3"
                placeholder="Enter deliverables separated by commas (e.g., Website Design, Logo, Brand Guidelines)"
              />
              <p className="text-xs text-slate-400 mt-1">
                Separate multiple deliverables with commas
              </p>
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
              {saving ? "Saving..." : "Update Project"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditProjectPage;

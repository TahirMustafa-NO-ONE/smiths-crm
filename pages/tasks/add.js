import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function AddTaskPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
    assignedTo: "",
    relatedToType: "",
    relatedToId: "",
    estimatedHours: 0,
    actualHours: 0,
    tags: "",
    notes: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    if (form.relatedToType) {
      fetchRelatedItems();
    } else {
      setRelatedItems([]);
      setForm({ ...form, relatedToId: "" });
    }
  }, [form.relatedToType]);

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

  const fetchRelatedItems = async () => {
    try {
      let endpoint = "";
      if (form.relatedToType === "Client") endpoint = "/api/client";
      if (form.relatedToType === "Project") endpoint = "/api/project";
      if (form.relatedToType === "Campaign") endpoint = "/api/campaign";

      if (endpoint) {
        const res = await fetch(endpoint);
        const data = await res.json();
        if (data.status === "success") {
          setRelatedItems(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching related items:", error);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const saveHandler = async () => {
    if (!form.title || !form.priority || !form.status || !form.assignedTo) {
      alert("Please fill in all required fields (Title, Priority, Status, and Assigned To)");
      return;
    }

    setLoading(true);
    try {
      // Convert tags from comma-separated string to array
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const taskData = {
        ...form,
        tags: tagsArray,
        relatedToType: form.relatedToType || undefined,
        relatedToId: form.relatedToId || undefined,
      };

      const res = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify({ data: taskData }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/tasks");
      } else {
        alert("Failed to create task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Error saving task");
    } finally {
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    router.push("/tasks");
  };

  const getRelatedItemName = (item) => {
    if (form.relatedToType === "Client") return item.companyName;
    if (form.relatedToType === "Project") return item.title;
    if (form.relatedToType === "Campaign") return item.name;
    return "";
  };

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        <div className="card max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">
            Add New Task
          </h1>

          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="label">
                Task Title <span className="text-danger-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={changeHandler}
                className="input"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={changeHandler}
                className="input"
                rows="3"
                placeholder="Describe the task..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label htmlFor="priority" className="label">
                  Priority <span className="text-danger-400">*</span>
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="label">
                  Status <span className="text-danger-400">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={changeHandler}
                  className="select"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div>
                <label htmlFor="dueDate" className="label">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={changeHandler}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="assignedTo" className="label">
                Assigned To <span className="text-danger-400">*</span>
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={form.assignedTo}
                onChange={changeHandler}
                className="select"
              >
                <option value="">Select Team Member</option>
                {teamMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Related To Section */}
            <div className="border border-slate-700 rounded-lg p-5 bg-slate-800/30">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                Related To (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="relatedToType" className="label">
                    Related To Type
                  </label>
                  <select
                    id="relatedToType"
                    name="relatedToType"
                    value={form.relatedToType}
                    onChange={changeHandler}
                    className="select"
                  >
                    <option value="">None</option>
                    <option value="Client">Client</option>
                    <option value="Project">Project</option>
                    <option value="Campaign">Campaign</option>
                  </select>
                </div>

                {form.relatedToType && (
                  <div>
                    <label htmlFor="relatedToId" className="label">
                      Select {form.relatedToType}
                    </label>
                    <select
                      id="relatedToId"
                      name="relatedToId"
                      value={form.relatedToId}
                      onChange={changeHandler}
                      className="select"
                    >
                      <option value="">Select {form.relatedToType}</option>
                      {relatedItems.map((item) => (
                        <option key={item._id} value={item._id}>
                          {getRelatedItemName(item)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="estimatedHours" className="label">
                  Estimated Hours
                </label>
                <input
                  id="estimatedHours"
                  name="estimatedHours"
                  type="number"
                  value={form.estimatedHours}
                  onChange={changeHandler}
                  className="input"
                  placeholder="0"
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label htmlFor="actualHours" className="label">
                  Actual Hours
                </label>
                <input
                  id="actualHours"
                  name="actualHours"
                  type="number"
                  value={form.actualHours}
                  onChange={changeHandler}
                  className="input"
                  placeholder="0"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="label">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={form.tags}
                onChange={changeHandler}
                className="input"
                placeholder="Enter tags separated by commas (e.g., urgent, design, review)"
              />
              <p className="text-xs text-slate-400 mt-1">
                Separate multiple tags with commas
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              onClick={saveHandler}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddTaskPage;

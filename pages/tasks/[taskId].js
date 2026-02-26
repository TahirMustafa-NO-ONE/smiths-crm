import Layout from "../../components/layout/Layout";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function TaskDetailsPage() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { taskId } = router.query;

  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const res = await fetch(`/api/task/${taskId}`);
      const data = await res.json();
      if (data.status === "success") {
        setTask(data.data);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/tasks");
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const markAsCompleteHandler = async () => {
    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ data: { ...task, status: "Done" } }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") {
        setTask({ ...task, status: "Done" });
      } else {
        alert("Failed to mark task as complete");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to mark task as complete");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "badge-danger";
      case "Medium":
        return "badge-warning";
      case "Low":
        return "badge-info";
      default:
        return "badge-info";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "badge-success";
      case "In Review":
        return "badge-info";
      case "In Progress":
        return "badge-primary";
      case "To Do":
        return "badge-secondary";
      default:
        return "badge-secondary";
    }
  };

  const getDueDateStatus = () => {
    if (!task?.dueDate) return null;
    
    const now = moment();
    const due = moment(task.dueDate);
    const daysUntilDue = due.diff(now, "days");

    if (daysUntilDue < 0) {
      return { status: "overdue", color: "text-danger-400", icon: "⚠️" };
    } else if (daysUntilDue <= 3) {
      return { status: "due-soon", color: "text-warning-400", icon: "⏰" };
    } else {
      return { status: "on-track", color: "text-success-400", icon: "✓" };
    }
  };

  const calculateTimeProgress = () => {
    if (!task.estimatedHours || task.estimatedHours === 0) return 0;
    return Math.min((task.actualHours / task.estimatedHours) * 100, 100);
  };

  const getTimeStatus = () => {
    const progress = calculateTimeProgress();
    if (progress >= 100) return "text-danger-400";
    if (progress >= 80) return "text-warning-400";
    return "text-success-400";
  };

  const getRelatedItemLink = () => {
    if (!task.relatedToType || !task.relatedToId) return null;
    
    const routes = {
      Client: `/clients/${task.relatedToId._id || task.relatedToId}`,
      Project: `/projects/${task.relatedToId._id || task.relatedToId}`,
      Campaign: `/campaigns/${task.relatedToId._id || task.relatedToId}`,
    };
    
    return routes[task.relatedToType];
  };

  const getRelatedItemName = () => {
    if (!task.relatedToId) return "N/A";
    if (typeof task.relatedToId === "object") {
      if (task.relatedToType === "Client") return task.relatedToId.companyName;
      if (task.relatedToType === "Project") return task.relatedToId.title;
      if (task.relatedToType === "Campaign") return task.relatedToId.name;
    }
    return task.relatedToId;
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

  if (!task) {
    return (
      <Layout>
        <div className="py-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
              Task not found
            </h2>
            <Link href="/tasks">
              <button className="btn btn-primary">Back to Tasks</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const dueDateStatus = getDueDateStatus();

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/tasks" className="hover:text-primary-400">
            Tasks
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-100">{task.title}</span>
        </div>

        <div className="mb-4">
          <Link href="/tasks">
            <button className="btn btn-secondary flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Tasks
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {task.title}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <span className={`badge ${getPriorityColor(task.priority)}`}>
                  {task.priority} Priority
                </span>
                <span className={`badge ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                {dueDateStatus && (
                  <span className={`badge ${dueDateStatus.color.replace('text-', 'badge-').replace('-400', '')}`}>
                    {dueDateStatus.icon} {dueDateStatus.status === "overdue" ? "Overdue" : dueDateStatus.status === "due-soon" ? "Due Soon" : "On Track"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Task Title
                </h3>
                <p className="text-slate-100">{task.title}</p>
              </div>

              {task.description && (
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">
                    Description
                  </h3>
                  <p className="text-slate-300 whitespace-pre-wrap">{task.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Priority
                </h3>
                <p className="text-slate-100">{task.priority}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Status</h3>
                <p className="text-slate-100">{task.status}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Assigned To
                </h3>
                <p className="text-slate-100">
                  {task.assignedTo?.name || "Unassigned"}
                  {task.assignedTo?.role && (
                    <span className="text-slate-400 text-sm ml-2">
                      ({task.assignedTo.role})
                    </span>
                  )}
                </p>
              </div>

              {task.relatedToType && (
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">
                    Related To
                  </h3>
                  <p className="text-slate-100">
                    {task.relatedToType}:{" "}
                    {getRelatedItemLink() ? (
                      <Link href={getRelatedItemLink()}>
                        <span className="text-primary-400 hover:underline cursor-pointer">
                          {getRelatedItemName()}
                        </span>
                      </Link>
                    ) : (
                      <span>{getRelatedItemName()}</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Due Date
                </h3>
                {task.dueDate ? (
                  <div>
                    <p className={`font-semibold ${dueDateStatus?.color || 'text-slate-100'}`}>
                      {moment(task.dueDate).format("MMMM D, YYYY")}
                    </p>
                    <p className="text-sm text-slate-400">
                      {moment(task.dueDate).fromNow()}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-400">Not set</p>
                )}
              </div>

              {(task.estimatedHours > 0 || task.actualHours > 0) && (
                <div>
                  <h3 className="text-sm font-medium text-slate-400 mb-2">
                    Time Tracking
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Estimated:</span>
                      <span className="text-slate-100 font-semibold">
                        {task.estimatedHours} hrs
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Actual:</span>
                      <span className={`font-semibold ${getTimeStatus()}`}>
                        {task.actualHours} hrs
                      </span>
                    </div>
                    {task.estimatedHours > 0 && (
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{calculateTimeProgress().toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              calculateTimeProgress() >= 100
                                ? "bg-danger-500"
                                : calculateTimeProgress() >= 80
                                ? "bg-warning-500"
                                : "bg-success-500"
                            }`}
                            style={{ width: `${calculateTimeProgress()}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Created</h3>
                <p className="text-slate-100">
                  {moment(task.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Last Updated
                </h3>
                <p className="text-slate-100">
                  {moment(task.updatedAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-600/20 text-primary-300 rounded-full text-sm border border-primary-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {task.notes && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Notes</h3>
              <p className="text-slate-300 whitespace-pre-wrap">{task.notes}</p>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50 flex-wrap">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete Task
            </button>
            {task.status !== "Done" && (
              <button onClick={markAsCompleteHandler} className="btn btn-success">
                Mark as Complete
              </button>
            )}
            <Link href={`/tasks/edit/${task._id}`}>
              <button className="btn btn-primary">Edit Task</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TaskDetailsPage;

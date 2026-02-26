import Layout from "../../components/layout/Layout";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/project/${projectId}`);
      const data = await res.json();
      if (data.status === "success") {
        setProject(data.data);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/project/${projectId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/projects");
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "badge-success";
      case "In Progress":
        return "badge-primary";
      case "Planning":
        return "badge-info";
      case "On Hold":
        return "badge-warning";
      case "Cancelled":
        return "badge-danger";
      default:
        return "badge-info";
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      Design: "badge-purple",
      Development: "badge-blue",
      Content: "badge-green",
      Strategy: "badge-orange",
      "Social Media": "badge-pink",
      SEO: "badge-cyan",
    };
    return colors[type] || "badge-info";
  };

  const calculateBudgetProgress = () => {
    if (!project.budget || project.budget === 0) return 0;
    return Math.min((project.actualSpend / project.budget) * 100, 100);
  };

  const getBudgetStatus = () => {
    const progress = calculateBudgetProgress();
    if (progress >= 100) return "text-danger-400";
    if (progress >= 80) return "text-warning-400";
    return "text-success-400";
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

  if (!project) {
    return (
      <Layout>
        <div className="py-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
              Project not found
            </h2>
            <Link href="/projects">
              <button className="btn btn-primary">Back to Projects</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/projects" className="hover:text-primary-400">
            Projects
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-100">{project.title}</span>
        </div>

        <div className="mb-4">
          <Link href="/projects">
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
              Back to Projects
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {project.title}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <span className={`badge ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`badge ${getTypeColor(project.type)}`}>
                  {project.type}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Project Title
                </h3>
                <p className="text-slate-100">{project.title}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Project Type
                </h3>
                <p className="text-slate-100">{project.type}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Client
                </h3>
                <p className="text-slate-100">
                  {project.client?.companyName ? (
                    <Link href={`/clients/${project.client._id}`}>
                      <span className="text-primary-400 hover:underline cursor-pointer">
                        {project.client.companyName}
                      </span>
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Status</h3>
                <p className="text-slate-100 capitalize">{project.status}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Assigned Team Members
                </h3>
                {project.assignedTeamMembers && project.assignedTeamMembers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.assignedTeamMembers.map((member, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-200"
                      >
                        {member.name || member}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No team members assigned</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Timeline
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Start Date:</span>
                    <span className="text-slate-100">
                      {project.startDate
                        ? moment(project.startDate).format("MMM D, YYYY")
                        : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Deadline:</span>
                    <span className="text-slate-100">
                      {project.deadline
                        ? moment(project.deadline).format("MMM D, YYYY")
                        : "Not set"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">
                  Budget & Spend
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Budget:</span>
                    <span className="text-slate-100 font-semibold">
                      ${project.budget?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Actual Spend:</span>
                    <span className={`font-semibold ${getBudgetStatus()}`}>
                      ${project.actualSpend?.toLocaleString() || 0}
                    </span>
                  </div>
                  {project.budget > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Budget Progress</span>
                        <span>{calculateBudgetProgress().toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            calculateBudgetProgress() >= 100
                              ? "bg-danger-500"
                              : calculateBudgetProgress() >= 80
                              ? "bg-warning-500"
                              : "bg-success-500"
                          }`}
                          style={{ width: `${calculateBudgetProgress()}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Created</h3>
                <p className="text-slate-100">
                  {moment(project.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Last Updated
                </h3>
                <p className="text-slate-100">
                  {moment(project.updatedAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>

          {project.deliverables && project.deliverables.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-3">
                Deliverables
              </h3>
              <ul className="space-y-2">
                {project.deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-100">
                    <svg
                      className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.notes && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Notes</h3>
              <p className="text-slate-300 whitespace-pre-wrap">{project.notes}</p>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete Project
            </button>
            <Link href={`/projects/edit/${project._id}`}>
              <button className="btn btn-primary">Edit Project</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectDetailsPage;

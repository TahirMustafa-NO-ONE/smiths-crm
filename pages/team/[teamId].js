import Layout from "../../components/layout/Layout";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function TeamMemberDetailsPage() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setMember(data.data);
      }
    } catch (error) {
      console.error("Error fetching team member:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const res = await fetch(`/api/team/${teamId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/team");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Failed to delete team member");
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

  if (!member) {
    return (
      <Layout>
        <div className="py-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Team member not found</h2>
            <Link href="/team">
              <button className="btn btn-primary">Back to Team</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        <div className="mb-4">
          <Link href="/team">
            <button className="btn btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Team
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-brand-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {member.name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <span className="badge badge-primary">
                  {member.role}
                </span>
                <span className="badge badge-success">
                  {member.activeProjects?.length || 0} Active Projects
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Full Name</h3>
                <p className="text-slate-100">{member.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Email</h3>
                <p className="text-primary-400">
                  <a href={`mailto:${member.email}`} className="hover:underline">
                    {member.email}
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Role</h3>
                <p className="text-slate-100">{member.role}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Skills</h3>
                <div className="flex gap-2 flex-wrap">
                  {member.skills && member.skills.length > 0 ? (
                    member.skills.map((skill, idx) => (
                      <span key={idx} className="badge badge-info">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-400">No skills listed</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Created</h3>
                <p className="text-slate-100">
                  {moment(member.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Last Updated</h3>
                <p className="text-slate-100">
                  {moment(member.updatedAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>

          {member.activeProjects && member.activeProjects.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-3">Active Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {member.activeProjects.map((project) => (
                  <div key={project._id} className="p-3 bg-slate-700/30 border border-slate-600/30 rounded-lg">
                    <p className="font-semibold text-slate-100">{project.title}</p>
                    <p className="text-sm text-slate-400 capitalize">{project.status}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete Team Member
            </button>
            <Link href={`/team/edit/${member._id}`}>
              <button className="btn btn-primary">
                Edit Team Member
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TeamMemberDetailsPage;

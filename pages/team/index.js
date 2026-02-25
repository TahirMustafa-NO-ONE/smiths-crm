import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";

function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [teamMembers, searchTerm, roleFilter]);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (data.status === "success") {
        setTeamMembers(data.data);
        setFilteredMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      return matchesSearch && matchesRole;
    });
    setFilteredMembers(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Team Members</h1>
            <p className="text-slate-400">Manage your team and assignments</p>
          </div>
          <Link href="/team/add">
            <button className="btn btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Team Member
            </button>
          </Link>
        </div>

        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Search</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="select"
              >
                <option value="all">All Roles</option>
                <option value="Account Manager">Account Manager</option>
                <option value="Designer">Designer</option>
                <option value="Copywriter">Copywriter</option>
                <option value="Media Buyer">Media Buyer</option>
                <option value="SEO Specialist">SEO Specialist</option>
                <option value="Developer">Developer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Skills</th>
                  <th>Active Projects</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-slate-400">
                      No team members found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((member) => (
                    <tr key={member._id}>
                      <td className="font-semibold">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          {member.name}
                        </div>
                      </td>
                      <td>{member.email}</td>
                      <td>
                        <span className="badge badge-primary">
                          {member.role}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-1 flex-wrap">
                          {member.skills?.slice(0, 2).map((skill, idx) => (
                            <span key={idx} className="badge badge-info text-xs">
                              {skill}
                            </span>
                          ))}
                          {member.skills?.length > 2 && (
                            <span className="badge badge-secondary text-xs">
                              +{member.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">
                          {member.activeProjects?.length || 0}
                        </span>
                      </td>
                      <td>{moment(member.createdAt).format("MMM D, YYYY")}</td>
                      <td>
                        <div className="flex gap-2">
                          <Link href={`/team/${member._id}`}>
                            <button className="btn-icon text-primary-400" title="View">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </Link>
                          <Link href={`/team/edit/${member._id}`}>
                            <button className="btn-icon text-warning-400" title="Edit">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6 pt-6 border-t border-slate-700/50">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-secondary"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn-secondary"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default TeamMembersPage;

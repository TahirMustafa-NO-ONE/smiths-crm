import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, stageFilter, sourceFilter]);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/lead");
      const data = await res.json();
      if (data.status === "success") {
        setLeads(data.data);
        setFilteredLeads(data.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads.filter(lead => {
      const matchesSearch = lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.contactName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === "all" || lead.stage === stageFilter;
      const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
      return matchesSearch && matchesStage && matchesSource;
    });
    setFilteredLeads(filtered);
    setCurrentPage(1);
  };

  const getStageColor = (stage) => {
    const colors = {
      new: 'badge-info',
      contacted: 'badge-primary',
      qualified: 'badge-warning',
      'proposal-sent': 'badge-warning',
      negotiating: 'badge-warning',
      won: 'badge-success',
      lost: 'badge-danger',
    };
    return colors[stage] || 'badge-info';
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

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
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Leads</h1>
            <p className="text-slate-400">Track and manage sales opportunities</p>
          </div>
          <Link href="/leads/add">
            <button className="btn btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Lead
            </button>
          </Link>
        </div>

        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Search</label>
              <input
                type="text"
                placeholder="Search by company or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Stage</label>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="select"
              >
                <option value="all">All Stages</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal-sent">Proposal Sent</option>
                <option value="negotiating">Negotiating</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div>
              <label className="label">Source</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="select"
              >
                <option value="all">All Sources</option>
                <option value="referral">Referral</option>
                <option value="cold outreach">Cold Outreach</option>
                <option value="inbound">Inbound</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="event">Event</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Stage</th>
                  <th>Source</th>
                  <th>Est. Value</th>
                  <th>Assigned To</th>
                  <th>Follow Up</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-8 text-slate-400">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((lead) => (
                    <tr key={lead._id}>
                      <td className="font-semibold">{lead.companyName}</td>
                      <td>{lead.contactName}</td>
                      <td>{lead.email}</td>
                      <td>
                        <span className={`badge ${getStageColor(lead.stage)}`}>
                          {lead.stage.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="capitalize">{lead.source}</td>
                      <td className="font-semibold text-success-400">
                        ${lead.estimatedValue?.toLocaleString() || 0}
                      </td>
                      <td>
                        {lead.assignedTo?.name || "Unassigned"}
                      </td>
                      <td>
                        {lead.followUpDate ? moment(lead.followUpDate).format("MMM D, YYYY") : "N/A"}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <Link href={`/leads/${lead._id}`}>
                            <button className="btn-icon text-primary-400" title="View">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </Link>
                          <Link href={`/leads/edit/${lead._id}`}>
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

export default LeadsPage;

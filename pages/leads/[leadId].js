import Layout from "../../components/layout/Layout";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function LeadDetailsPage() {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { leadId } = router.query;

  useEffect(() => {
    if (leadId) {
      fetchLead();
    }
  }, [leadId]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/lead/${leadId}`);
      const data = await res.json();
      if (data.status === "success") {
        setLead(data.data);
      }
    } catch (error) {
      console.error("Error fetching lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    
    try {
      const res = await fetch(`/api/lead/${leadId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/leads");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead");
    }
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

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="spinner w-8 h-8" />
        </div>
      </Layout>
    );
  }

  if (!lead) {
    return (
      <Layout>
        <div className="py-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Lead not found</h2>
            <Link href="/leads">
              <button className="btn btn-primary">Back to Leads</button>
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
          <Link href="/leads">
            <button className="btn btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Leads
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {lead.companyName}
              </h1>
              <div className="flex gap-2">
                <span className={`badge ${getStageColor(lead.stage)}`}>
                  {lead.stage.replace('-', ' ')}
                </span>
                <span className="badge badge-info capitalize">
                  {lead.source}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Company Name</h3>
                <p className="text-slate-100">{lead.companyName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Contact Name</h3>
                <p className="text-slate-100">{lead.contactName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Email</h3>
                <p className="text-primary-400">
                  <a href={`mailto:${lead.email}`} className="hover:underline">
                    {lead.email}
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Phone</h3>
                <p className="text-slate-100">
                  {lead.phone ? (
                    <a href={`tel:${lead.phone}`} className="hover:underline text-primary-400">
                      {lead.phone}
                    </a>
                  ) : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Service Interested In</h3>
                <p className="text-slate-100">{lead.serviceInterestedIn || "N/A"}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Source</h3>
                <p className="text-slate-100 capitalize">{lead.source}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Stage</h3>
                <p className="text-slate-100 capitalize">{lead.stage.replace('-', ' ')}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Estimated Value</h3>
                <p className="text-success-400 font-semibold text-xl">
                  ${lead.estimatedValue?.toLocaleString() || 0}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Assigned To</h3>
                <p className="text-slate-100">
                  {lead.assignedTo?.name || "Unassigned"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Follow Up Date</h3>
                <p className="text-slate-100">
                  {lead.followUpDate ? moment(lead.followUpDate).format("MMMM D, YYYY") : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Created</h3>
                <p className="text-slate-100">
                  {moment(lead.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>
          
          {lead.notes && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Notes</h3>
              <p className="text-slate-300 whitespace-pre-wrap">{lead.notes}</p>
            </div>
          )}
          
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete Lead
            </button>
            <Link href={`/leads/edit/${lead._id}`}>
              <button className="btn btn-primary">
                Edit Lead
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LeadDetailsPage;

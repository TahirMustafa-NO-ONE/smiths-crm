import Layout from "../../components/layout/Layout";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function ClientDetailsPage() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { clientId } = router.query;

  useEffect(() => {
    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/client/${clientId}`);
      const data = await res.json();
      if (data.status === "success") {
        setClient(data.data);
      }
    } catch (error) {
      console.error("Error fetching client:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    try {
      const res = await fetch(`/api/client/${clientId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/clients");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-danger';
      case 'prospect': return 'badge-warning';
      default: return 'badge-info';
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

  if (!client) {
    return (
      <Layout>
        <div className="py-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-4">Client not found</h2>
            <Link href="/clients">
              <button className="btn btn-primary">Back to Clients</button>
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
          <Link href="/clients">
            <button className="btn btn-secondary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Clients
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {client.companyName}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <span className={`badge ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
                <span className="badge badge-primary">
                  {client.tier}
                </span>
                <span className="badge badge-info">
                  {client.industry}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Company Name</h3>
                <p className="text-slate-100">{client.companyName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Industry</h3>
                <p className="text-slate-100 capitalize">{client.industry}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Website</h3>
                <p className="text-primary-400">
                  {client.website ? (
                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {client.website}
                    </a>
                  ) : "N/A"}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Tier</h3>
                <p className="text-slate-100 capitalize">{client.tier}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Account Manager</h3>
                <p className="text-slate-100">
                  {client.assignedAccountManager?.name || "Unassigned"}
                  {client.assignedAccountManager && (
                    <span className="text-slate-400 text-sm ml-2">
                      ({client.assignedAccountManager.role})
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Status</h3>
                <p className="text-slate-100 capitalize">{client.status}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Monthly Retainer Value</h3>
                <p className="text-success-400 font-semibold text-xl">
                  ${client.monthlyRetainerValue?.toLocaleString() || 0}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Onboarded Date</h3>
                <p className="text-slate-100">
                  {client.onboardedDate ? moment(client.onboardedDate).utc().format("MMMM D, YYYY") : "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Created</h3>
                <p className="text-slate-100">
                  {moment(client.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Last Updated</h3>
                <p className="text-slate-100">
                  {moment(client.updatedAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>
          
          {client.notes && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Notes</h3>
              <p className="text-slate-300 whitespace-pre-wrap">{client.notes}</p>
            </div>
          )}
          
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete Client
            </button>
            <Link href={`/clients/edit/${client._id}`}>
              <button className="btn btn-primary">
                Edit Client
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ClientDetailsPage;

import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function CustomerDetailsPage({ data }) {
  const router = useRouter();

  const deleteHandler = async () => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    const res = await fetch(`/api/delete/${data._id}`, {
      method: "DELETE",
    });
    const newRes = await res.json();
    if (newRes.status === "success") router.push("/");
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-danger';
      case 'prospect': return 'badge-warning';
      default: return 'badge-info';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              {data.companyName}
            </h1>
            <div className="flex gap-2">
              <span className={`badge ${getStatusColor(data.status)}`}>
                {data.status}
              </span>
              <span className="badge badge-primary">
                {data.tier}
              </span>
              <span className="badge badge-info">
                {data.industry}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Company Name</h3>
              <p className="text-slate-100">{data.companyName}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Industry</h3>
              <p className="text-slate-100">{data.industry}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Website</h3>
              <p className="text-primary-400">
                {data.website ? (
                  <a href={data.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {data.website}
                  </a>
                ) : "N/A"}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Tier</h3>
              <p className="text-slate-100">{data.tier}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Status</h3>
              <p className="text-slate-100 capitalize">{data.status}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Monthly Retainer Value</h3>
              <p className="text-success-400 font-semibold text-xl">
                ${data.monthlyRetainerValue.toLocaleString()}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Onboarded Date</h3>
              <p className="text-slate-100">
                {data.onboardedDate ? moment(data.onboardedDate).utc().format("MMMM D, YYYY") : "N/A"}
              </p>
            </div>
          </div>
        </div>
        
        {data.notes && (
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <h3 className="text-sm font-medium text-slate-400 mb-2">Notes</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{data.notes}</p>
          </div>
        )}
        
        <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
          <button onClick={deleteHandler} className="btn btn-danger">
            Delete Client
          </button>
          <Link href={`/edit/${data._id}`}>
            <button className="btn btn-primary">
              Edit Client
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsPage;

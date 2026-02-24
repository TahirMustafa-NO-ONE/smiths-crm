import Link from "next/link";
import { useRouter } from "next/router";

function Card({ customer }) {
  const router = useRouter();
  
  const deleteHandler = async () => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    const res = await fetch(`/api/delete/${customer._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === "success") router.reload();
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-danger';
      case 'prospect': return 'badge-warning';
      default: return 'badge-info';
    }
  };
  
  const getTierBadge = (tier) => {
    switch(tier) {
      case 'retainer': return 'badge-primary';
      case 'project-based': return 'badge-info';
      case 'one-time': return 'badge-warning';
      default: return 'badge-info';
    }
  };
  
  return (
    <div className="card card-hover group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-slate-100 group-hover:text-primary-400 transition-colors">
              {customer.companyName}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`badge ${getStatusColor(customer.status)}`}>
              {customer.status}
            </span>
            <span className={`badge ${getTierBadge(customer.tier)}`}>
              {customer.tier}
            </span>
            <span className="badge badge-info">
              {customer.industry}
            </span>
          </div>
          
          {customer.monthlyRetainerValue > 0 && (
            <p className="text-sm text-slate-400">
              Monthly Value: <span className="text-success-400 font-semibold">${customer.monthlyRetainerValue.toLocaleString()}</span>
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={deleteHandler}
            className="btn btn-danger text-sm"
          >
            Delete
          </button>
          <Link href={`/edit/${customer._id}`}>
            <button className="btn btn-secondary text-sm">
              Edit
            </button>
          </Link>
          <Link href={`/customer/${customer._id}`}>
            <button className="btn btn-primary text-sm">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;

import Card from "../module/Card";
import { useState } from "react";

function HomePage({ customers }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadSampleData = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage({
          type: "success",
          text: `✓ Success! Loaded ${data.data.customers} clients, ${data.data.leads} leads, ${data.data.projects} projects, ${data.data.campaigns} campaigns, and ${data.data.tasks} tasks.`,
        });
        // Reload the page after 2 seconds to show new data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage({
          type: "error",
          text: `✗ Error: ${data.message}`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `✗ Failed to load sample data: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Client Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your marketing agency clients</p>
          </div>
          
          {/* <button
            onClick={loadSampleData}
            disabled={loading}
            className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            {loading ? "Loading Sample Data..." : "Load Sample Data"}
          </button> */}
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg border animate-slide-in ${
              message.type === "success"
                ? "bg-success-500/10 border-success-500/30 text-success-400"
                : "bg-danger-500/10 border-danger-500/30 text-danger-400"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      {customers.length === 0 ? (
        <div className="card text-center py-12">
          <svg 
            className="w-16 h-16 mx-auto text-slate-600 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No Clients Yet</h3>
          <p className="text-slate-400 mb-4">Get started by adding your first client or loading sample data</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card key={customer._id} customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;

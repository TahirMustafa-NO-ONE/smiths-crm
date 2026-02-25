import Card from "../module/Card";
import Link from "next/link";
import { useState, useEffect } from "react";

function HomePage({ customers, dbError }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [dbConnecting, setDbConnecting] = useState(true);

  useEffect(() => {
    // Brief "connecting" indicator on initial mount, then resolve
    const timer = setTimeout(() => setDbConnecting(false), 600);
    return () => clearTimeout(timer);
  }, []);

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

  // Show brief connecting indicator on initial mount
  if (dbConnecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 animate-fade-in">
        <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-800/60 border border-slate-700/50 shadow-lg">
          <div className="spinner w-5 h-5 flex-shrink-0" />
          <span className="text-slate-300 text-sm font-medium">Connecting to database...</span>
        </div>
      </div>
    );
  }

  // Show DB error state
  if (dbError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 animate-fade-in">
        <div className="card max-w-md w-full text-center py-10 px-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-danger-500/10 border border-danger-500/30 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-danger-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Could Not Connect to Database
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Unable to load data. Please check your database connection settings or try again shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Client Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your marketing agency clients</p>
          </div>

          <Link href="/add-customer">
            <button className="btn btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Client
            </button>
          </Link>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-lg border animate-slide-in ${message.type === "success"
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


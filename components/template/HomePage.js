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
    <div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button
          onClick={loadSampleData}
          disabled={loading}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: loading ? "none" : "0 4px 6px rgba(0, 112, 243, 0.3)",
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.backgroundColor = "#0051cc";
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.backgroundColor = "#0070f3";
          }}
        >
          {loading ? "Loading Sample Data..." : "🎲 Load Sample Data"}
        </button>

        {message.text && (
          <div
            style={{
              marginTop: "15px",
              padding: "12px 20px",
              borderRadius: "6px",
              backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
              color: message.type === "success" ? "#155724" : "#721c24",
              border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
              fontSize: "14px",
              maxWidth: "600px",
              margin: "15px auto 0",
            }}
          >
            {message.text}
          </div>
        )}
      </div>

      {customers.map((customer) => (
        <Card key={customer._id} customer={customer} />
      ))}
    </div>
  );
}

export default HomePage;

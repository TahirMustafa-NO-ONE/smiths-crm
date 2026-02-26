import Layout from "../../components/layout/Layout";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function CampaignDetailsPage() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { campaignId } = router.query;

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      const res = await fetch(`/api/campaign/${campaignId}`);
      const data = await res.json();
      if (data.status === "success") {
        setCampaign(data.data);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;

    try {
      const res = await fetch(`/api/campaign/${campaignId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "success") {
        router.push("/campaigns");
      } else {
        alert("Failed to delete campaign");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      alert("Failed to delete campaign");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "badge-success";
      case "Completed":
        return "badge-info";
      case "Planning":
        return "badge-warning";
      case "Paused":
        return "badge-secondary";
      case "Cancelled":
        return "badge-danger";
      default:
        return "badge-info";
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      "Email Marketing": "badge-blue",
      "Social Media": "badge-pink",
      PPC: "badge-orange",
      "Content Marketing": "badge-green",
      SEO: "badge-purple",
      Other: "badge-info",
    };
    return colors[type] || "badge-info";
  };

  const calculateCTR = () => {
    if (!campaign?.kpis?.impressions || campaign.kpis.impressions === 0) return 0;
    return ((campaign.kpis.clicks / campaign.kpis.impressions) * 100).toFixed(2);
  };

  const calculateROI = () => {
    if (!campaign?.spend || campaign.spend === 0) return 0;
    return ((campaign.kpis?.conversions || 0) / campaign.spend).toFixed(2);
  };

  const calculateBudgetProgress = () => {
    if (!campaign.budget || campaign.budget === 0) return 0;
    return Math.min((campaign.spend / campaign.budget) * 100, 100);
  };

  const getBudgetStatus = () => {
    const progress = calculateBudgetProgress();
    if (progress >= 100) return "text-danger-400";
    if (progress >= 80) return "text-warning-400";
    return "text-success-400";
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

  if (!campaign) {
    return (
      <Layout>
        <div className="py-6">
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
              Campaign not found
            </h2>
            <Link href="/campaigns">
              <button className="btn btn-primary">Back to Campaigns</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/campaigns" className="hover:text-primary-400">
            Campaigns
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-100">{campaign.name}</span>
        </div>

        <div className="mb-4">
          <Link href="/campaigns">
            <button className="btn btn-secondary flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Campaigns
            </button>
          </Link>
        </div>

        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                {campaign.name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <span className={`badge ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
                <span className={`badge ${getTypeColor(campaign.type)}`}>
                  {campaign.type}
                </span>
                {campaign.platform && (
                  <span className="badge badge-info">
                    {campaign.platform}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Campaign Name
                </h3>
                <p className="text-slate-100">{campaign.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Campaign Type
                </h3>
                <p className="text-slate-100">{campaign.type}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Client
                </h3>
                <p className="text-slate-100">
                  {campaign.client?.companyName ? (
                    <Link href={`/clients/${campaign.client._id}`}>
                      <span className="text-primary-400 hover:underline cursor-pointer">
                        {campaign.client.companyName}
                      </span>
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Status</h3>
                <p className="text-slate-100 capitalize">{campaign.status}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Platform
                </h3>
                <p className="text-slate-100">{campaign.platform || "N/A"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Timeline
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Start Date:</span>
                    <span className="text-slate-100">
                      {campaign.startDate
                        ? moment(campaign.startDate).format("MMM D, YYYY")
                        : "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">End Date:</span>
                    <span className="text-slate-100">
                      {campaign.endDate
                        ? moment(campaign.endDate).format("MMM D, YYYY")
                        : "Not set"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-2">
                  Budget & Spend
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Budget:</span>
                    <span className="text-slate-100 font-semibold">
                      ${campaign.budget?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Actual Spend:</span>
                    <span className={`font-semibold ${getBudgetStatus()}`}>
                      ${campaign.spend?.toLocaleString() || 0}
                    </span>
                  </div>
                  {campaign.budget > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Budget Progress</span>
                        <span>{calculateBudgetProgress().toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            calculateBudgetProgress() >= 100
                              ? "bg-danger-500"
                              : calculateBudgetProgress() >= 80
                              ? "bg-warning-500"
                              : "bg-success-500"
                          }`}
                          style={{ width: `${calculateBudgetProgress()}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">Created</h3>
                <p className="text-slate-100">
                  {moment(campaign.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-1">
                  Last Updated
                </h3>
                <p className="text-slate-100">
                  {moment(campaign.updatedAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>

          {/* KPI Dashboard */}
          {campaign.kpis && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                KPI Dashboard
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">Impressions</div>
                  <div className="text-2xl font-bold text-primary-400">
                    {campaign.kpis.impressions?.toLocaleString() || 0}
                  </div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">Clicks</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {campaign.kpis.clicks?.toLocaleString() || 0}
                  </div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">Conversions</div>
                  <div className="text-2xl font-bold text-success-400">
                    {campaign.kpis.conversions?.toLocaleString() || 0}
                  </div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">CTR</div>
                  <div className="text-2xl font-bold text-warning-400">
                    {calculateCTR()}%
                  </div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">ROI</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {calculateROI()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Conversions/Spend</div>
                </div>
              </div>
            </div>
          )}

          {campaign.goal && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-2">
                Goal / Objective
              </h3>
              <p className="text-slate-300 whitespace-pre-wrap">{campaign.goal}</p>
            </div>
          )}

          {campaign.notes && (
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Notes</h3>
              <p className="text-slate-300 whitespace-pre-wrap">{campaign.notes}</p>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete Campaign
            </button>
            <Link href={`/campaigns/edit/${campaign._id}`}>
              <button className="btn btn-primary">Edit Campaign</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CampaignDetailsPage;

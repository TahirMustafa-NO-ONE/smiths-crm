import Layout from "../components/layout/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";

function DashboardPage() {
  const [stats, setStats] = useState({
    clients: { total: 0, active: 0, prospect: 0 },
    leads: { total: 0, new: 0, won: 0 },
    projects: { total: 0, active: 0, completed: 0 },
    tasks: { total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 },
    campaigns: { total: 0, active: 0 },
    teamMembers: { total: 0, workload: [] },
    revenue: { mrr: 0, totalValue: 0 },
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all data in parallel
      const [clientsRes, leadsRes, projectsRes, tasksRes, campaignsRes, teamRes] = await Promise.all([
        fetch("/api/client"),
        fetch("/api/lead"),
        fetch("/api/project"),
        fetch("/api/task"),
        fetch("/api/campaign"),
        fetch("/api/team"),
      ]);

      const [clientsData, leadsData, projectsData, tasksData, campaignsData, teamData] = await Promise.all([
        clientsRes.json(),
        leadsRes.json(),
        projectsRes.json(),
        tasksRes.json(),
        campaignsRes.json(),
        teamRes.json(),
      ]);

      // Calculate stats
      const clients = clientsData.status === "success" ? clientsData.data : [];
      const leads = leadsData.status === "success" ? leadsData.data : [];
      const projects = projectsData.status === "success" ? projectsData.data : [];
      const tasks = tasksData.status === "success" ? tasksData.data : [];
      const campaigns = campaignsData.status === "success" ? campaignsData.data : [];
      const team = teamData.status === "success" ? teamData.data : [];

      const now = moment();

      setStats({
        clients: {
          total: clients.length,
          active: clients.filter(c => c.status === 'active').length,
          prospect: clients.filter(c => c.status === 'prospect').length,
        },
        leads: {
          total: leads.length,
          new: leads.filter(l => l.stage === 'new').length,
          won: leads.filter(l => l.stage === 'won').length,
        },
        projects: {
          total: projects.length,
          active: projects.filter(p => p.status === 'in-progress').length,
          completed: projects.filter(p => p.status === 'completed').length,
        },
        tasks: {
          total: tasks.length,
          todo: tasks.filter(t => t.status === 'todo').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          done: tasks.filter(t => t.status === 'done').length,
          overdue: tasks.filter(t => t.dueDate && moment(t.dueDate).isBefore(now) && t.status !== 'done').length,
        },
        campaigns: {
          total: campaigns.length,
          active: campaigns.filter(c => c.status === 'active').length,
        },
        teamMembers: {
          total: team.length,
          workload: team.map(member => ({
            name: member.name,
            role: member.role,
            tasks: tasks.filter(t => t.assignedTo?._id === member._id && t.status !== 'done').length,
            projects: member.activeProjects?.length || 0,
          })).sort((a, b) => (b.tasks + b.projects) - (a.tasks + a.projects)),
        },
        revenue: {
          mrr: clients.reduce((sum, c) => sum + (c.monthlyRetainerValue || 0), 0),
          totalValue: leads.filter(l => l.stage !== 'lost').reduce((sum, l) => sum + (l.estimatedValue || 0), 0),
        },
      });

      // Get upcoming tasks (next 7 days)
      const upcoming = tasks
        .filter(t => t.dueDate && moment(t.dueDate).isAfter(now) && moment(t.dueDate).isBefore(now.clone().add(7, 'days')) && t.status !== 'done')
        .sort((a, b) => moment(a.dueDate).diff(moment(b.dueDate)))
        .slice(0, 5);
      setUpcomingTasks(upcoming);

      // Create recent activities from various models
      const activities = [
        ...clients.map(c => ({ type: 'client', name: c.companyName, date: c.createdAt })),
        ...projects.map(p => ({ type: 'project', name: p.title, date: p.createdAt })),
        ...leads.map(l => ({ type: 'lead', name: l.companyName, date: l.createdAt })),
      ]
        .sort((a, b) => moment(b.date).diff(moment(a.date)))
        .slice(0, 8);
      setRecentActivities(activities);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
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

  return (
    <Layout>
      <div className="py-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Dashboard</h1>
          <p className="text-slate-400">Overview of your CRM metrics and performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link href="/clients">
            <div className="card cursor-pointer hover:border-primary-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-slate-400 font-medium">Clients</h3>
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-100 mb-2">{stats.clients.total}</div>
              <div className="flex gap-3 text-sm">
                <span className="text-success-400">{stats.clients.active} active</span>
                <span className="text-warning-400">{stats.clients.prospect} prospects</span>
              </div>
            </div>
          </Link>

          <Link href="/leads">
            <div className="card cursor-pointer hover:border-success-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-slate-400 font-medium">Leads</h3>
                <div className="w-12 h-12 rounded-lg bg-success-500/10 border border-success-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-100 mb-2">{stats.leads.total}</div>
              <div className="flex gap-3 text-sm">
                <span className="text-info-400">{stats.leads.new} new</span>
                <span className="text-success-400">{stats.leads.won} won</span>
              </div>
            </div>
          </Link>

          <Link href="/projects">
            <div className="card cursor-pointer hover:border-warning-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-slate-400 font-medium">Projects</h3>
                <div className="w-12 h-12 rounded-lg bg-warning-500/10 border border-warning-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-100 mb-2">{stats.projects.total}</div>
              <div className="flex gap-3 text-sm">
                <span className="text-primary-400">{stats.projects.active} active</span>
                <span className="text-success-400">{stats.projects.completed} done</span>
              </div>
            </div>
          </Link>

          <Link href="/tasks">
            <div className="card cursor-pointer hover:border-info-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-slate-400 font-medium">Tasks</h3>
                <div className="w-12 h-12 rounded-lg bg-info-500/10 border border-info-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-info-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-100 mb-2">{stats.tasks.total}</div>
              <div className="flex gap-3 text-sm">
                <span className="text-primary-400">{stats.tasks.inProgress} active</span>
                {stats.tasks.overdue > 0 && (
                  <span className="text-danger-400">{stats.tasks.overdue} overdue</span>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Revenue & Campaigns Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Revenue Overview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Monthly Recurring Revenue</p>
                <p className="text-3xl font-bold text-success-400">${stats.revenue.mrr.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Pipeline Value</p>
                <p className="text-2xl font-bold text-primary-400">${stats.revenue.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Campaigns</h3>
              <Link href="/campaigns">
                <button className="text-primary-400 hover:text-primary-300 text-sm">View All →</button>
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Campaigns</span>
                <span className="text-2xl font-bold text-slate-100">{stats.campaigns.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Active Campaigns</span>
                <span className="text-2xl font-bold text-success-400">{stats.campaigns.active}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Workload & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Team Workload</h3>
              <Link href="/team">
                <button className="text-primary-400 hover:text-primary-300 text-sm">View Team →</button>
              </Link>
            </div>
            <div className="space-y-3">
              {stats.teamMembers.workload.slice(0, 5).map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-100">{member.name}</p>
                    <p className="text-sm text-slate-400">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-300">
                      {member.tasks} tasks, {member.projects} projects
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Upcoming Tasks</h3>
              <Link href="/tasks">
                <button className="text-primary-400 hover:text-primary-300 text-sm">View All →</button>
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <div key={task._id} className="flex items-start justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-100">{task.title}</p>
                      <p className="text-sm text-slate-400">
                        Assigned to: {task.assignedTo?.name || "Unassigned"}
                      </p>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-sm text-warning-400">
                        {moment(task.dueDate).fromNow()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-4">No upcoming tasks</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'client' ? 'bg-primary-400' :
                  activity.type === 'project' ? 'bg-warning-400' :
                  'bg-success-400'
                }`} />
                <div className="flex-1">
                  <span className="text-slate-300">New {activity.type}: </span>
                  <span className="font-semibold text-slate-100">{activity.name}</span>
                </div>
                <span className="text-sm text-slate-400">
                  {moment(activity.date).fromNow()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardPage;

import connectDB from "../../utils/connectDB";
import Customer from "../../models/Customer";
import Client from "../../models/Client";
import TeamMember from "../../models/TeamMember";
import Contact from "../../models/Contact";
import Lead from "../../models/Lead";
import Project from "../../models/Project";
import Campaign from "../../models/Campaign";
import Task from "../../models/Task";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "failed", message: "Method not allowed" });
  }

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "failed", message: "Error in connecting to DB" });
  }

  try {
    // Clear existing sample data (optional - you can comment this out if you want to keep existing data)
    await Customer.deleteMany({});
    await Client.deleteMany({});
    await TeamMember.deleteMany({});
    await Contact.deleteMany({});
    await Lead.deleteMany({});
    await Project.deleteMany({});
    await Campaign.deleteMany({});
    await Task.deleteMany({});

    // Helper function to get random date within last N days
    const getRandomDate = (daysBack) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
      return date;
    };

    // Helper function to get future date
    const getFutureDate = (daysForward) => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * daysForward));
      return date;
    };

    // 1. Create Team Members first (needed for relationships)
    const teamMembers = await TeamMember.create([
      {
        name: "Sarah Johnson",
        email: "sarah.johnson@smithagency.com",
        role: "Account Manager",
        skills: ["Client Relations", "Project Management", "Strategic Planning"],
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },
      {
        name: "Michael Chen",
        email: "michael.chen@smithagency.com",
        role: "SEO Specialist",
        skills: ["SEO", "Google Analytics", "Content Strategy", "Technical SEO"],
        avatarUrl: "https://i.pravatar.cc/150?img=2",
      },
      {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@smithagency.com",
        role: "Designer",
        skills: ["UI/UX Design", "Branding", "Adobe Creative Suite", "Figma"],
        avatarUrl: "https://i.pravatar.cc/150?img=3",
      },
      {
        name: "David Park",
        email: "david.park@smithagency.com",
        role: "Media Buyer",
        skills: ["Google Ads", "Facebook Ads", "PPC Strategy", "Analytics"],
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },
      {
        name: "Lisa Thompson",
        email: "lisa.thompson@smithagency.com",
        role: "Copywriter",
        skills: ["Content Writing", "SEO Copywriting", "Email Marketing", "Social Media"],
        avatarUrl: "https://i.pravatar.cc/150?img=5",
      },
      {
        name: "James Wilson",
        email: "james.wilson@smithagency.com",
        role: "Developer",
        skills: ["React", "Node.js", "WordPress", "E-commerce"],
        avatarUrl: "https://i.pravatar.cc/150?img=6",
      },
    ]);

    // 2. Create Clients/Customers
    const clients = await Customer.create([
      {
        companyName: "TechStart Solutions",
        industry: "SaaS",
        website: "https://techstartsolutions.com",
        tier: "retainer",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 5000,
        onboardedDate: getRandomDate(180),
        notes: "Growing B2B SaaS startup focused on project management tools. Looking to scale their marketing efforts.",
      },
      {
        companyName: "HealthPlus Clinics",
        industry: "healthcare",
        website: "https://healthplusclinics.com",
        tier: "project-based",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 0,
        onboardedDate: getRandomDate(90),
        notes: "Multi-location healthcare provider. Currently working on website redesign and local SEO.",
      },
      {
        companyName: "StyleHub Fashion",
        industry: "retail",
        website: "https://stylehubfashion.com",
        tier: "retainer",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 7500,
        onboardedDate: getRandomDate(365),
        notes: "E-commerce fashion retailer. Focus on social media marketing and influencer partnerships.",
      },
      {
        companyName: "EduLearn Academy",
        industry: "education",
        website: "https://edulearnacademy.com",
        tier: "one-time",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 0,
        onboardedDate: getRandomDate(60),
        notes: "Online education platform. Working on a branding refresh and paid ads campaign.",
      },
      {
        companyName: "BuildRight Construction",
        industry: "manufacturing",
        website: "https://buildrightconstruction.com",
        tier: "project-based",
        status: "prospect",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 0,
        notes: "Construction company interested in digital transformation. Proposal sent for website and SEO services.",
      },
      {
        companyName: "FinanceFirst Advisors",
        industry: "finance",
        website: "https://financefirstadvisors.com",
        tier: "retainer",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 4000,
        onboardedDate: getRandomDate(120),
        notes: "Financial advisory firm. Compliance-focused content marketing and LinkedIn strategy.",
      },
    ]);

    // Also create the same clients in the Client collection
    const clientRecords = await Client.create([
      {
        companyName: "TechStart Solutions",
        industry: "SaaS",
        website: "https://techstartsolutions.com",
        tier: "retainer",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 5000,
        onboardedDate: getRandomDate(180),
        notes: "Growing B2B SaaS startup focused on project management tools.",
      },
      {
        companyName: "HealthPlus Clinics",
        industry: "healthcare",
        website: "https://healthplusclinics.com",
        tier: "project-based",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 0,
        onboardedDate: getRandomDate(90),
        notes: "Multi-location healthcare provider.",
      },
      {
        companyName: "StyleHub Fashion",
        industry: "retail",
        website: "https://stylehubfashion.com",
        tier: "retainer",
        status: "active",
        assignedAccountManager: teamMembers[0]._id,
        monthlyRetainerValue: 7500,
        onboardedDate: getRandomDate(365),
        notes: "E-commerce fashion retailer.",
      },
    ]);

    // 3. Create Contacts
    const contacts = await Contact.create([
      {
        firstName: "Robert",
        lastName: "Martinez",
        email: "robert.martinez@techstartsolutions.com",
        phone: "+1-555-0101",
        jobTitle: "CEO",
        client: clientRecords[0]._id,
        isPrimary: true,
        linkedInUrl: "https://linkedin.com/in/robertmartinez",
        preferredContact: "email",
      },
      {
        firstName: "Jennifer",
        lastName: "Lee",
        email: "jennifer.lee@techstartsolutions.com",
        phone: "+1-555-0102",
        jobTitle: "Marketing Director",
        client: clientRecords[0]._id,
        isPrimary: false,
        linkedInUrl: "https://linkedin.com/in/jenniferlee",
        preferredContact: "phone",
      },
      {
        firstName: "Dr. Amanda",
        lastName: "Foster",
        email: "amanda.foster@healthplusclinics.com",
        phone: "+1-555-0201",
        jobTitle: "Chief Medical Officer",
        client: clientRecords[1]._id,
        isPrimary: true,
        linkedInUrl: "https://linkedin.com/in/amandafoster",
        preferredContact: "email",
      },
      {
        firstName: "Marcus",
        lastName: "Williams",
        email: "marcus.williams@stylehubfashion.com",
        phone: "+1-555-0301",
        jobTitle: "Founder & Creative Director",
        client: clientRecords[2]._id,
        isPrimary: true,
        linkedInUrl: "https://linkedin.com/in/marcuswilliams",
        preferredContact: "WhatsApp",
      },
    ]);

    // 4. Create Leads
    const leads = await Lead.create([
      {
        companyName: "GreenEarth Sustainability",
        contactName: "Patricia Green",
        email: "patricia@greenearthsustain.com",
        phone: "+1-555-0401",
        source: "referral",
        serviceInterestedIn: "SEO and Content Marketing",
        estimatedValue: 6000,
        stage: "qualified",
        followUpDate: getFutureDate(7),
        assignedTo: teamMembers[0]._id,
        notes: "Referred by TechStart Solutions. Interested in sustainable business marketing.",
      },
      {
        companyName: "QuickBite Food Delivery",
        contactName: "Carlos Rodriguez",
        email: "carlos@quickbite.com",
        phone: "+1-555-0402",
        source: "inbound",
        serviceInterestedIn: "Social Media & Paid Ads",
        estimatedValue: 8500,
        stage: "proposal-sent",
        followUpDate: getFutureDate(3),
        assignedTo: teamMembers[0]._id,
        notes: "Fast-growing food delivery startup. Sent proposal for Meta Ads and influencer campaign.",
      },
      {
        companyName: "NexGen Robotics",
        contactName: "Dr. Kevin Zhang",
        email: "kzhang@nexgenrobotics.com",
        phone: "+1-555-0403",
        source: "LinkedIn",
        serviceInterestedIn: "Branding & Web Design",
        estimatedValue: 15000,
        stage: "negotiating",
        followUpDate: getFutureDate(2),
        assignedTo: teamMembers[0]._id,
        notes: "B2B robotics company preparing for Series A. Need complete brand refresh.",
      },
      {
        companyName: "Sparkle Clean Services",
        contactName: "Maria Santos",
        email: "maria@sparkleclean.com",
        phone: "+1-555-0404",
        source: "cold outreach",
        serviceInterestedIn: "Local SEO",
        estimatedValue: 2500,
        stage: "contacted",
        followUpDate: getFutureDate(5),
        assignedTo: teamMembers[0]._id,
        notes: "Local cleaning service looking to expand to 3 new cities.",
      },
      {
        companyName: "PetCare Plus",
        contactName: "Tom Bradley",
        email: "tom@petcareplus.com",
        phone: "+1-555-0405",
        source: "event",
        serviceInterestedIn: "Full Marketing Stack",
        estimatedValue: 10000,
        stage: "new",
        followUpDate: getFutureDate(1),
        assignedTo: teamMembers[0]._id,
        notes: "Met at SMB Marketing Conference. Veterinary clinic chain with 8 locations.",
      },
    ]);

    // 5. Create Projects
    const projects = await Project.create([
      {
        title: "TechStart Website Redesign",
        type: "Web Design",
        client: clientRecords[0]._id,
        status: "in-progress",
        startDate: getRandomDate(45),
        deadline: getFutureDate(30),
        budget: 15000,
        actualSpend: 8500,
        assignedTeamMembers: [teamMembers[2]._id, teamMembers[5]._id],
        deliverables: ["New UI/UX Design", "Responsive Website", "CMS Integration", "SEO Optimization"],
        notes: "Modern SaaS website with focus on conversion optimization and mobile experience.",
      },
      {
        title: "HealthPlus Local SEO Campaign",
        type: "SEO",
        client: clientRecords[1]._id,
        status: "in-progress",
        startDate: getRandomDate(60),
        deadline: getFutureDate(60),
        budget: 8000,
        actualSpend: 4200,
        assignedTeamMembers: [teamMembers[1]._id, teamMembers[4]._id],
        deliverables: ["Google My Business Optimization", "Local Citations", "Content Creation", "Monthly Reports"],
        notes: "Focus on improving local search rankings for all 5 clinic locations.",
      },
      {
        title: "StyleHub Social Media Management",
        type: "Social Media",
        client: clientRecords[2]._id,
        status: "in-progress",
        startDate: getRandomDate(90),
        deadline: getFutureDate(90),
        budget: 6000,
        actualSpend: 5800,
        assignedTeamMembers: [teamMembers[4]._id, teamMembers[2]._id],
        deliverables: ["Content Calendar", "Daily Posting", "Influencer Partnerships", "Community Management"],
        notes: "Ongoing social media management across Instagram, TikTok, and Pinterest.",
      },
      {
        title: "FinanceFirst Thought Leadership",
        type: "Email Marketing",
        client: clientRecords[2]._id,
        status: "planning",
        startDate: getFutureDate(14),
        deadline: getFutureDate(120),
        budget: 5000,
        actualSpend: 0,
        assignedTeamMembers: [teamMembers[4]._id],
        deliverables: ["Email Newsletter Strategy", "Content Creation", "Email Automation Setup", "Analytics Dashboard"],
        notes: "Monthly newsletter and drip campaigns to nurture leads and showcase expertise.",
      },
    ]);

    // Update team members with active projects
    await TeamMember.findByIdAndUpdate(teamMembers[2]._id, { activeProjects: [projects[0]._id, projects[2]._id] });
    await TeamMember.findByIdAndUpdate(teamMembers[5]._id, { activeProjects: [projects[0]._id] });
    await TeamMember.findByIdAndUpdate(teamMembers[1]._id, { activeProjects: [projects[1]._id] });
    await TeamMember.findByIdAndUpdate(teamMembers[4]._id, { activeProjects: [projects[1]._id, projects[2]._id, projects[3]._id] });

    // 6. Create Campaigns
    const campaigns = await Campaign.create([
      {
        name: "TechStart Google Ads - Project Management Tools",
        client: clientRecords[0]._id,
        type: "Google Ads",
        status: "active",
        budget: 5000,
        spend: 3200,
        startDate: getRandomDate(30),
        endDate: getFutureDate(60),
        platform: "Google Ads",
        goal: "leads",
        kpis: {
          impressions: 45000,
          clicks: 1350,
          conversions: 85,
          ctr: 3.0,
          roas: 4.2,
        },
        notes: "Search and display campaigns targeting project managers and team leads.",
      },
      {
        name: "StyleHub Instagram Shopping Campaign",
        client: clientRecords[2]._id,
        type: "Meta Ads",
        status: "active",
        budget: 8000,
        spend: 7200,
        startDate: getRandomDate(45),
        endDate: getFutureDate(15),
        platform: "Meta (Facebook & Instagram)",
        goal: "sales",
        kpis: {
          impressions: 250000,
          clicks: 8750,
          conversions: 420,
          ctr: 3.5,
          roas: 5.8,
        },
        notes: "Dynamic product ads targeting fashion-conscious millennials and Gen Z.",
      },
      {
        name: "HealthPlus Awareness Campaign",
        client: clientRecords[1]._id,
        type: "Meta Ads",
        status: "paused",
        budget: 3000,
        spend: 2100,
        startDate: getRandomDate(60),
        endDate: getRandomDate(10),
        platform: "Meta (Facebook & Instagram)",
        goal: "awareness",
        kpis: {
          impressions: 180000,
          clicks: 3600,
          conversions: 45,
          ctr: 2.0,
          roas: 0,
        },
        notes: "Brand awareness campaign for new clinic locations. Paused for budget reallocation.",
      },
    ]);

    // 7. Create Tasks
    const tasks = await Task.create([
      {
        title: "Send TechStart monthly analytics report",
        description: "Compile and send Q1 performance metrics including website traffic, conversions, and campaign results.",
        linkedToClient: clientRecords[0]._id,
        linkedToProject: projects[0]._id,
        assignedTo: teamMembers[0]._id,
        dueDate: getFutureDate(3),
        priority: "high",
        status: "todo",
      },
      {
        title: "Follow up with GreenEarth lead",
        description: "Schedule discovery call to discuss SEO needs and content strategy.",
        linkedToLead: leads[0]._id,
        assignedTo: teamMembers[0]._id,
        dueDate: getFutureDate(7),
        priority: "high",
        status: "todo",
      },
      {
        title: "Create StyleHub Instagram content calendar",
        description: "Plan Instagram posts for next 2 weeks including product features and lifestyle content.",
        linkedToClient: clientRecords[2]._id,
        linkedToProject: projects[2]._id,
        assignedTo: teamMembers[4]._id,
        dueDate: getFutureDate(2),
        priority: "urgent",
        status: "in-progress",
      },
      {
        title: "Optimize HealthPlus Google My Business listings",
        description: "Update all 5 clinic locations with new photos, posts, and Q&A responses.",
        linkedToClient: clientRecords[1]._id,
        linkedToProject: projects[1]._id,
        assignedTo: teamMembers[1]._id,
        dueDate: getFutureDate(5),
        priority: "medium",
        status: "in-progress",
      },
      {
        title: "Design mockups for TechStart homepage",
        description: "Create 3 homepage design variations focusing on SaaS conversion best practices.",
        linkedToClient: clientRecords[0]._id,
        linkedToProject: projects[0]._id,
        assignedTo: teamMembers[2]._id,
        dueDate: getFutureDate(4),
        priority: "high",
        status: "done",
      },
      {
        title: "Prepare proposal for NexGen Robotics",
        description: "Create detailed branding and web design proposal including timeline and pricing.",
        linkedToLead: leads[2]._id,
        assignedTo: teamMembers[0]._id,
        dueDate: getFutureDate(1),
        priority: "urgent",
        status: "in-progress",
      },
      {
        title: "Review StyleHub campaign performance",
        description: "Analyze Meta Ads performance and prepare optimization recommendations.",
        linkedToClient: clientRecords[2]._id,
        assignedTo: teamMembers[3]._id,
        dueDate: getFutureDate(6),
        priority: "medium",
        status: "todo",
      },
    ]);

    const summary = {
      teamMembers: teamMembers.length,
      customers: clients.length,
      clients: clientRecords.length,
      contacts: contacts.length,
      leads: leads.length,
      projects: projects.length,
      campaigns: campaigns.length,
      tasks: tasks.length,
    };

    return res.status(200).json({
      status: "success",
      message: "Sample data loaded successfully!",
      data: summary,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: "Error seeding database: " + err.message,
    });
  }
}

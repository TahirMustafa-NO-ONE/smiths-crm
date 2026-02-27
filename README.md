# Smith Marketing Agency - CRM System

A comprehensive Customer Relationship Management system built with Next.js (Pages Router), MongoDB, and NextAuth.

## 📁 Project Structure

```
smiths-crm/
├── components/              # React components organized by feature
│   ├── customers/          # Customer-related components
│   │   ├── AddCustomerPage.js
│   │   ├── Card.js         # Customer card display component
│   │   ├── CustomerDetailsPage.js
│   │   ├── CustomerEditPage.js
│   │   ├── Form.js         # Customer form component
│   │   └── HomePage.js     # Customer listing page
│   ├── layout/             # Layout components
│   │   └── Layout.js       # Main app layout with navigation
│   └── ui/                 # Reusable UI components
│       └── FormInput.js    # Generic form input component
│
├── models/                  # Mongoose data models
│   ├── Campaign.js         # Marketing campaign model
│   ├── Client.js           # Client model
│   ├── Contact.js          # Contact model
│   ├── Customer.js         # Customer model
│   ├── Lead.js             # Lead model
│   ├── Project.js          # Project model
│   ├── Task.js             # Task model
│   ├── TeamMember.js       # Team member model
│   └── User.js             # User authentication model
│
├── pages/                   # Next.js pages (routes)
│   ├── _app.js             # App wrapper with SessionProvider
│   ├── index.js            # Root redirect to dashboard
│   ├── login.js            # Login page
│   ├── dashboard.js        # Main dashboard
│   ├── home.js             # Customer home page
│   ├── users.js            # User management page
│   │
│   ├── add-customer/       # Legacy customer creation
│   │   └── index.js
│   ├── customer/           # Legacy customer routes
│   │   └── [customerId].js
│   ├── edit/               # Legacy customer edit routes
│   │   └── [customerId].js
│   │
│   ├── campaigns/          # Campaign CRUD pages
│   │   ├── [campaignId].js
│   │   ├── index.js
│   │   ├── add.js
│   │   └── edit/
│   │       └── [campaignId].js
│   ├── clients/            # Client CRUD pages
│   │   ├── [clientId].js
│   │   ├── index.js
│   │   ├── add.js
│   │   └── edit/
│   │       └── [clientId].js
│   ├── contacts/           # Contact CRUD pages
│   │   ├── [contactId].js
│   │   ├── index.js
│   │   ├── add.js
│   │   └── edit/
│   │       └── [contactId].js
│   ├── leads/              # Lead CRUD pages
│   │   ├── [leadId].js
│   │   ├── index.js
│   │   ├── add.js
│   │   └── edit/
│   │       └── [leadId].js
│   ├── projects/           # Project CRUD pages
│   │   ├── [projectId].js
│   │   ├── index.js
│   │   ├── add.js
│   │   └── edit/
│   │       └── [projectId].js
│   ├── tasks/              # Task CRUD pages
│   │   ├── [taskId].js
│   │   ├── index.js
│   │   ├── add.js
│   │   └── edit/
│   │       └── [taskId].js
│   ├── team/               # Team member CRUD pages
│   │   ├── [teamId].js
│   │   ├── index.js
│   │   ├── add.js
│   │   └── edit/
│   │       └── [teamId].js
│   │
│   └── api/                # API routes
│       ├── seed.js         # Sample data seeding endpoint
│       ├── auth/
│       │   └── [...nextauth].js    # NextAuth configuration
│       ├── campaign/       # Campaign API endpoints
│       │   ├── [campaignId].js
│       │   └── index.js
│       ├── client/         # Client API endpoints
│       │   ├── [clientId].js
│       │   └── index.js
│       ├── contact/        # Contact API endpoints
│       │   ├── [contactId].js
│       │   └── index.js
│       ├── customer/       # Customer API endpoints
│       │   ├── [customerId].js
│       │   └── index.js
│       ├── delete/         # Delete endpoints
│       │   └── [customerId].js
│       ├── edit/           # Edit endpoints
│       │   └── [customerId].js
│       ├── lead/           # Lead API endpoints
│       │   ├── [leadId].js
│       │   └── index.js
│       ├── project/        # Project API endpoints
│       │   ├── [projectId].js
│       │   └── index.js
│       ├── task/           # Task API endpoints
│       │   ├── [taskId].js
│       │   └── index.js
│       ├── team/           # Team API endpoints
│       │   ├── [teamId].js
│       │   └── index.js
│       └── users/          # User API endpoints
│           ├── [id].js
│           └── index.js
│
├── public/                  # Static assets
├── styles/                  # Global styles
│   └── globals.css         # Global CSS with Tailwind
├── utils/                   # Utility functions
│   ├── connectDB.js        # MongoDB connection utility
│   └── seedAdmin.js        # Admin user seeding script
│
├── .env.local              # Environment variables (not in git)
├── .gitignore              # Git ignore rules
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file (using pnpm)
├── postcss.config.js       # PostCSS configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (package manager)
- MongoDB instance

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ```

3. Seed admin user:
   ```bash
   pnpm seed
   ```
   Default credentials: `admin@smithsagency.com` / `admin123`

4. Run development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 📝 Key Features

- **Dashboard**: Overview of all CRM metrics
- **Client Management**: Full CRUD for clients  
- **Lead Tracking**: Manage and convert leads
- **Project Management**: Track client projects
- **Task Management**: Organize team tasks
- **Campaign Tracking**: Monitor marketing campaigns
- **Team Management**: Manage team members
- **Contact Management**: Store and organize contacts
- **User Authentication**: Role-based access control (admin/user)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (Pages Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Mongoose
- **Database**: MongoDB
- **Authentication**: NextAuth.js with credentials provider
- **Package Manager**: pnpm

## 📦 Component Organization

Components are organized by feature/domain:
- `components/customers/` - Customer-specific components (legacy feature)
- `components/layout/` - App-wide layout components
- `components/ui/` - Reusable, generic UI components

## 🔄 Data Models

The system uses multiple data models:
- **Customer** vs **Client**: Both exist in the system. Customer routes (`/home`, `/customer/[id]`) are legacy but still functional. Client routes (`/clients`) are the primary feature.
- **Lead**: Potential clients in the sales pipeline
- **Project**: Work engagements with clients
- **Task**: Action items for team members
- **Campaign**: Marketing campaigns
- **Contact**: Individual contact persons
- **TeamMember**: Internal team members
- **User**: System users with authentication

## 🔒 Authentication

The app uses NextAuth.js with a credentials provider:
- Admin users have full access to all features
- Regular users have limited access (configurable)
- Protected routes redirect to `/login` if not authenticated

## 📌 Notes

- Uses **pnpm** as the package manager (package-lock.json is gitignored)
- All database seeding scripts are preserved in `utils/seedAdmin.js` and `pages/api/seed.js`
- Legacy customer routes still exist but are not in the main navigation

## 🧹 Recent Cleanup (January 2026)

- Removed unused components (`ItemList.js`)
- Reorganized components into feature-based directories
- Cleaned up lock files (standardized on pnpm)
- Updated all import paths to reflect new structure
- Verified all pages are active routes (no orphaned pages)

---

**Smith Marketing Agency** | CRM System v0.1.0

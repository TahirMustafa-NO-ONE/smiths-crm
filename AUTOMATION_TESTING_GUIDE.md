# Automation System Testing Guide

## Prerequisites
- Dev server running: `pnpm dev`
- Admin email set in .env.local: `*****************@gmail.com`
- Resend API key configured
- Logged in as admin user

---

## Test 1: New Client Creation
**Triggers:** Welcome email to client + admin

### Steps:
1. Go to the Clients page in your CRM
2. Click "Add New Client" (or use the client creation form)
3. Fill in the form with:
   - Company Name: "Test Company"
   - **Email: A REAL email you can check** (e.g., tahirmustafa12516@gmail.com)
   - Tier: Select any tier
   - Other fields (optional)
4. Click "Create Client"

### Expected Result:
- ✅ Client created successfully
- ✅ Welcome email sent to the client email
- ✅ Welcome email sent to admin (tahirmustafa12516@gmail.com)
- ✅ Check your inbox for "Welcome to Smith Marketing Agency"

---

## Test 2: New Project Creation
**Triggers:** Project created email to client + admin

### Steps:
1. Go to the Projects page
2. Click "Add New Project"
3. Fill in the form:
   - Title: "Test Marketing Campaign"
   - Type: Select any type (e.g., "Social Media")
   - **Client: Select a client that has a valid email**
   - Budget: 5000
   - Other fields (optional)
4. Click "Create Project"

### Expected Result:
- ✅ Project created successfully
- ✅ Email sent to client: "New Project Created"
- ✅ Email sent to admin
- ✅ Check inbox for project creation notification

---

## Test 3: Project Status Change to "In Progress"
**Triggers:** Project in-progress email to client

### Steps:
1. Go to Projects page
2. Select an existing project
3. Click "Edit" or open project details
4. Change status from "planning" to "in-progress"
5. Save changes

### Expected Result:
- ✅ Project status updated
- ✅ Email sent to client: "Your Project Is Now In Progress"
- ✅ Check inbox for in-progress notification

---

## Test 4: Project Status Change to "Completed" (MAIN TEST)
**Triggers:**
- Invoice generation
- PDF creation
- Project completed email to client
- Invoice email to client
- Invoice email to admin

### Steps:
1. Go to Projects page
2. Select a project that:
   - Has a budget > 0
   - Is linked to a client with a valid email
3. Edit the project
4. Change status to "completed"
5. Save changes

### Expected Result:
- ✅ Project status updated to "completed"
- ✅ Invoice created in database with format INV-2026-0001
- ✅ PDF generated in `/public/invoices/INV-2026-0001.pdf`
- ✅ Email sent to client: "Your Project Has Been Completed"
- ✅ Email sent to client: "Invoice Generated - INV-2026-0001"
- ✅ Email sent to admin: "Invoice Generated - INV-2026-0001"
- ✅ Invoice appears in `/invoices` page

**To verify invoice:**
1. Navigate to `http://localhost:3000/invoices`
2. Check if the new invoice appears in the table
3. Click "Download" to view the PDF

---

## Test 5: Task Assigned
**Triggers:** Task assigned email to assignee

### Steps:
1. Go to Tasks page
2. Create a new task OR edit existing task
3. Assign the task to a team member who has an email
4. Set status to **any status** (the email triggers when assignedTo is set)
5. Save task

### Expected Result:
- ✅ Task assigned to team member
- ✅ Email sent to assignee: "New Task Assigned to You"
- ✅ If team member email is valid, check inbox

---

## Test 6: Task Completed
**Triggers:** Task completed email to assignee

### Steps:
1. Go to Tasks page
2. Select a task that is assigned to a team member
3. Edit the task
4. Change status to "done"
5. Save changes

### Expected Result:
- ✅ Task status updated to "done"
- ✅ Email sent to assignee: "Task Completed"
- ✅ Check assignee's inbox

---

## Checking Emails

### Option 1: Check Real Inbox
- Check `****************@gmail.com` for all admin notifications
- Check any client/team member emails you used during testing

### Option 2: Check Resend Dashboard
1. Go to https://resend.com/
2. Login to your account
3. Navigate to "Emails" section
4. See all sent emails, their status, and preview them

---

## Checking Server Logs

Watch the terminal/console where `pnpm dev` is running. You should see:
- "Invoice generated successfully: INV-2026-XXXX"
- "Email sent successfully"
- Any automation errors will appear here

---

## Viewing Invoices Page

1. Navigate to `http://localhost:3000/invoices`
2. Login as admin (you need admin role)
3. You should see a table with all generated invoices
4. Each invoice shows:
   - Invoice Number
   - Client
   - Project
   - Amount
   - Status (Paid/Unpaid)
   - Issued Date
   - Due Date
   - Download PDF link

---

## Troubleshooting

### No emails received?
- Check spam folder
- Verify Resend API key in .env.local
- Check terminal for "Email sent successfully" logs
- Go to Resend dashboard to see email status

### Invoice not generating?
- Check project has a budget > 0
- Check project is linked to a client
- Look for errors in terminal console
- Check `/public/invoices/` folder for PDF files

### PDF download not working?
- Ensure `/public/invoices/` folder exists
- Check file permissions
- Look for PDF generation errors in console

### "Access Denied" on invoices page?
- Make sure you're logged in as admin
- Check `session.user.role === "admin"`

---

## Quick Testing Checklist

- [ ] New client → emails sent
- [ ] New project → emails sent
- [ ] Project to in-progress → email sent
- [ ] Project to completed → invoice + emails sent
- [ ] Invoice appears on `/invoices` page
- [ ] PDF downloads successfully
- [ ] Task assigned → email sent
- [ ] Task completed → email sent

---

## Notes

- All automations run asynchronously (fire-and-forget)
- API responses are not blocked by automation
- Errors are logged but don't crash the API
- If email fails, the operation still succeeds
- If PDF fails, invoice is still created (just without PDF link)

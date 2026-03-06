// Script to add email fields to existing clients
// Run this in MongoDB Compass or mongo shell

// Example: Update a specific client with email
db.clients.updateOne(
  { companyName: "Your Client Name" },
  {
    $set: {
      email: "client@example.com",
      name: "Client Contact Name"
    }
  }
);

// Or update all clients at once (add your test email)
db.clients.updateMany(
  { email: { $exists: false } },
  {
    $set: {
      email: "tahirmustafa12516@gmail.com",  // Your test email
      name: "Test Contact"
    }
  }
);

// Check which clients don't have email
db.clients.find({
  $or: [
    { email: { $exists: false } },
    { email: "" },
    { email: null }
  ]
});

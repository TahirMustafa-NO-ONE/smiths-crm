const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/smiths-crm";

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@smithsagency.com" });
    
    if (existingAdmin) {
      console.log("⚠ Admin user already exists!");
      console.log("Email: admin@smithsagency.com");
      console.log("If you need to reset the password, delete this user first.");
      await mongoose.connection.close();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@smithsagency.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✓ Admin user created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email:    admin@smithsagency.com");
    console.log("Password: admin123");
    console.log("Role:     admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Close connection
    await mongoose.connection.close();
    console.log("✓ Database connection closed");
    
  } catch (error) {
    console.error("✗ Error seeding admin user:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedAdmin();

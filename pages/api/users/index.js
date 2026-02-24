import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  // Check if user is authenticated
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if user is admin
  if (session.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access required" });
  }

  await connectDB();

  if (req.method === "GET") {
    try {
      const users = await User.find().select("-password").sort({ createdAt: -1 });
      res.status(200).json({ status: "success", data: users });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, password, role } = req.body.data || req.body;

      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ 
          status: "error", 
          message: "Name, email, and password are required" 
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ 
          status: "error", 
          message: "User with this email already exists" 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || "user",
      });

      // Return user without password
      const userResponse = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };

      res.status(201).json({ status: "success", data: userResponse });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

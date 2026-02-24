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

  const { id } = req.query;

  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const { name, email, password, role } = req.body.data || req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email.toLowerCase();
      if (role) updateData.role = role;
      
      // Only hash and update password if provided
      if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }

      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      // Prevent deleting yourself
      if (id === session.user.id) {
        return res.status(400).json({ 
          status: "error", 
          message: "You cannot delete your own account" 
        });
      }

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }

      res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const user = await User.findById(id).select("-password");

      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }

      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

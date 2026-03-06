import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import Invoice from "../../../models/Invoice";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to database" });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  }

  if (req.method === "GET") {
    if (session.user.role !== "admin") {
      return res.status(403).json({
        status: "failed",
        message: "Forbidden - Admin access required",
      });
    }

    try {
      const invoices = await Invoice.find({})
        .populate("projectId")
        .populate("clientId")
        .sort({ createdAt: -1 });

      res.status(200).json({ status: "success", data: invoices });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from database",
      });
    }
  }
}

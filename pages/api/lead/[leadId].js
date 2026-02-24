import Lead from "../../../models/Lead";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to database" });
    return;
  }

  if (req.method === "GET") {
    const id = req.query.leadId;
    try {
      const lead = await Lead.findOne({ _id: id }).populate("assignedTo");
      res.status(200).json({ status: "success", data: lead });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from database",
      });
    }
  }

  if (req.method === "DELETE") {
    const id = req.query.leadId;
    try {
      await Lead.deleteOne({ _id: id });
      res.status(200).json({ status: "success", message: "Data deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in deleting data from database",
      });
    }
  }

  if (req.method === "PATCH") {
    const id = req.query.leadId;
    const data = req.body.data;

    try {
      const lead = await Lead.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );
      res.status(200).json({ status: "success", data: lead });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in updating data in database",
      });
    }
  }
}

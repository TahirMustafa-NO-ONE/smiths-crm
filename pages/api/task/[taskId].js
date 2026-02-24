import Task from "../../../models/Task";
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
    const id = req.query.taskId;
    try {
      const task = await Task.findOne({ _id: id })
        .populate("linkedToClient")
        .populate("linkedToProject")
        .populate("linkedToLead")
        .populate("assignedTo");
      res.status(200).json({ status: "success", data: task });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from database",
      });
    }
  }

  if (req.method === "DELETE") {
    const id = req.query.taskId;
    try {
      await Task.deleteOne({ _id: id });
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
    const id = req.query.taskId;
    const data = req.body.data;

    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );
      res.status(200).json({ status: "success", data: task });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in updating data in database",
      });
    }
  }
}

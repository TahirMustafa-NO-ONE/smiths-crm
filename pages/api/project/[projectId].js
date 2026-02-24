import Project from "../../../models/Project";
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
    const id = req.query.projectId;
    try {
      const project = await Project.findOne({ _id: id })
        .populate("client")
        .populate("assignedTeamMembers");
      res.status(200).json({ status: "success", data: project });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from database",
      });
    }
  }

  if (req.method === "DELETE") {
    const id = req.query.projectId;
    try {
      await Project.deleteOne({ _id: id });
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
    const id = req.query.projectId;
    const data = req.body.data;

    try {
      const project = await Project.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );
      res.status(200).json({ status: "success", data: project });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in updating data in database",
      });
    }
  }
}

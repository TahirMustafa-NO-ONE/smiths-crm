import TeamMember from "../../../models/TeamMember";
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
    const id = req.query.teamId;
    try {
      const teamMember = await TeamMember.findOne({ _id: id }).populate("activeProjects");
      res.status(200).json({ status: "success", data: teamMember });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from database",
      });
    }
  }

  if (req.method === "DELETE") {
    const id = req.query.teamId;
    try {
      await TeamMember.deleteOne({ _id: id });
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
    const id = req.query.teamId;
    const data = req.body.data;

    try {
      const teamMember = await TeamMember.findByIdAndUpdate(
        id,
        { ...data, updatedAt: Date.now() },
        { new: true }
      );
      res.status(200).json({ status: "success", data: teamMember });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in updating data in database",
      });
    }
  }
}

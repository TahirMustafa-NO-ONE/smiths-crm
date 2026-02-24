import Project from "../../../models/Project";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
    return;
  }

  if (req.method === "GET") {
    try {
      const projects = await Project.find()
        .populate("client")
        .populate("assignedTeamMembers");
      res.status(200).json({ status: "success", data: projects });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from DB",
      });
    }
  }

  if (req.method === "POST") {
    const { data } = req.body;

    if (!data.title || !data.type || !data.client)
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid data" });

    try {
      const project = await Project.create(data);
      res
        .status(201)
        .json({ status: "success", message: "Data created", data: project });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in storing data in DB",
      });
    }
  }
}

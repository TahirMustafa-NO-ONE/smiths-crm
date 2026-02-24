import TeamMember from "../../../models/TeamMember";
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
      const teamMembers = await TeamMember.find().populate("activeProjects");
      res.status(200).json({ status: "success", data: teamMembers });
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

    if (!data.name || !data.email || !data.role)
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid data" });

    try {
      const teamMember = await TeamMember.create(data);
      res
        .status(201)
        .json({ status: "success", message: "Data created", data: teamMember });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in storing data in DB",
      });
    }
  }
}

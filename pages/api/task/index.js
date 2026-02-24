import Task from "../../../models/Task";
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
      const tasks = await Task.find()
        .populate("linkedToClient")
        .populate("linkedToProject")
        .populate("linkedToLead")
        .populate("assignedTo");
      res.status(200).json({ status: "success", data: tasks });
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

    if (!data.title)
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid data" });

    try {
      const task = await Task.create(data);
      res
        .status(201)
        .json({ status: "success", message: "Data created", data: task });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in storing data in DB",
      });
    }
  }
}

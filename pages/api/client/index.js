import Client from "../../../models/Client";
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
      const clients = await Client.find({})
        .populate("assignedAccountManager")
        .sort({ createdAt: -1 });
      res.status(200).json({ status: "success", data: clients });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in fetching data from DB",
      });
    }
  } else if (req.method === "POST") {
    const { data } = req.body;

    if (!data.companyName || !data.tier)
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid data" });

    try {
      const client = await Client.create(data);
      res
        .status(201)
        .json({ status: "success", message: "Data created", data: client });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in storing data in DB",
      });
    }
  }
}

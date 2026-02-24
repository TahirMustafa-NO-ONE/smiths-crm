import Campaign from "../../../models/Campaign";
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
      const campaigns = await Campaign.find().populate("client");
      res.status(200).json({ status: "success", data: campaigns });
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

    if (!data.name || !data.client || !data.type)
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid data" });

    try {
      const campaign = await Campaign.create(data);
      res
        .status(201)
        .json({ status: "success", message: "Data created", data: campaign });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in storing data in DB",
      });
    }
  }
}

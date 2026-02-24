import Lead from "../../../models/Lead";
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
      const leads = await Lead.find().populate("assignedTo");
      res.status(200).json({ status: "success", data: leads });
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

    if (!data.companyName || !data.contactName || !data.email || !data.source)
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid data" });

    try {
      const lead = await Lead.create(data);
      res
        .status(201)
        .json({ status: "success", message: "Data created", data: lead });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in storing data in DB",
      });
    }
  }
}

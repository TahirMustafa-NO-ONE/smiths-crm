import Client from "../../../models/Client";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  const {
    query: { clientId },
    method,
  } = req;

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  if (method === "GET") {
    try {
      const client = await Client.findById(clientId).populate("assignedAccountManager");
      if (!client) {
        return res
          .status(404)
          .json({ status: "failed", message: "Client not found" });
      }
      res.status(200).json({ status: "success", data: client });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in fetching data from DB",
      });
    }
  } else if (method === "PUT" || method === "PATCH") {
    const { data } = req.body;
    try {
      const client = await Client.findByIdAndUpdate(
        clientId,
        { ...data, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      if (!client) {
        return res
          .status(404)
          .json({ status: "failed", message: "Client not found" });
      }
      res.status(200).json({
        status: "success",
        message: "Client updated",
        data: client,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in updating data in DB",
      });
    }
  } else if (method === "DELETE") {
    try {
      const client = await Client.findByIdAndDelete(clientId);
      if (!client) {
        return res
          .status(404)
          .json({ status: "failed", message: "Client not found" });
      }
      res.status(200).json({
        status: "success",
        message: "Client deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "failed",
        message: "Error in deleting data from DB",
      });
    }
  }
}

import Customer from "../../../models/Customer";
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

  if (req.method === "PATCH") {
    const id = req.query.customerId;
    const data = req.body.data;

    try {
      const customer = await Customer.findOne({ _id: id });
      customer.companyName = data.companyName;
      customer.industry = data.industry;
      customer.website = data.website;
      customer.logoUrl = data.logoUrl;
      customer.tier = data.tier;
      customer.status = data.status;
      customer.assignedAccountManager = data.assignedAccountManager;
      customer.monthlyRetainerValue = data.monthlyRetainerValue;
      customer.onboardedDate = data.onboardedDate;
      customer.notes = data.notes;
      customer.updatedAt = Date.now();
      customer.save();
      res.status(200).json({ status: "success", data: customer });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        status: "failed",
        message: "Error in retrieving data from database",
      });
    }
  }
}

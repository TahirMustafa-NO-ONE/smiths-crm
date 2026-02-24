import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function CustomerDetailsPage({ data }) {
  const router = useRouter();

  const deleteHandler = async () => {
    const res = await fetch(`/api/delete/${data._id}`, {
      method: "DELETE",
    });
    const newRes = await res.json();
    if (newRes.status === "success") router.push("/");
  };
  return (
    <div className="customer-detail">
      <h4>Client Details</h4>
      <div className="customer-detail__main">
        <div className="customer-detail__item">
          <span>Company Name: </span>
          <p>{data.companyName}</p>
        </div>
        <div className="customer-detail__item">
          <span>Industry: </span>
          <p>{data.industry}</p>
        </div>
        <div className="customer-detail__item">
          <span>Website: </span>
          <p>{data.website || "N/A"}</p>
        </div>
        <div className="customer-detail__item">
          <span>Logo URL: </span>
          <p>{data.logoUrl || "N/A"}</p>
        </div>
        <div className="customer-detail__item">
          <span>Tier: </span>
          <p>{data.tier}</p>
        </div>
        <div className="customer-detail__item">
          <span>Status: </span>
          <p>{data.status}</p>
        </div>
        <div className="customer-detail__item">
          <span>Monthly Retainer Value: </span>
          <p>${data.monthlyRetainerValue}</p>
        </div>
        <div className="customer-detail__item">
          <span>Onboarded Date: </span>
          <p>{data.onboardedDate ? moment(data.onboardedDate).utc().format("YYYY-MM-DD") : "N/A"}</p>
        </div>
        <div className="customer-detail__item">
          <span>Notes: </span>
          <p>{data.notes || "N/A"}</p>
        </div>
      </div>
      <div className="customer-detail__buttons">
        <p>Edit or Delete?</p>
        <button onClick={deleteHandler}>Delete</button>
        <Link href={`/edit/${data._id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default CustomerDetailsPage;

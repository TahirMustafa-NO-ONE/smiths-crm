import connectDB from "../utils/connectDB";
import Customer from "../models/Customer";
import HomePage from "../components/template/HomePage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

function Index({ customers }) {
  return <HomePage customers={customers} />;
}

export default Index;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // Redirect to login if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    await connectDB();
    const customers = await Customer.find();
    return {
      props: {
        customers: JSON.parse(JSON.stringify(customers)),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

// Root route redirects authenticated users to dashboard
// This page never actually renders
function Index() {
  return null;
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

  // Redirect authenticated users to dashboard
  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
}

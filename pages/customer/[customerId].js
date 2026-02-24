import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomerDetailsPage from "../../components/template/CustomerDetailsPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

function Index() {
  const [data, setData] = useState(null);

  const router = useRouter();
  const {
    query: { customerId },
    isReady,
  } = router;

  useEffect(() => {
    if (isReady) {
      fetch(`/api/customer/${customerId}`)
        .then((res) => res.json())
        .then((data) => setData(data.data));
    }
  }, [isReady]);
  if (data) return <CustomerDetailsPage data={data} />;
}

export default Index;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

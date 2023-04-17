import Main from "@/components/home/Main";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CRM | Dashboard</title>
      </Head>

      <Main />
    </>
  );
}


//  check cokkie available or not if not then redirect to login
export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  let token = getCookie("auth", { req, res });

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
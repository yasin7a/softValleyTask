import Main from "@/components/login/Main";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>CRM | Login</title>
      </Head>

      <Main />
    </>
  );
};

export default Login;

//  check cokkie available or not if has then redirect to home

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  let token = getCookie("auth", { req, res });

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}

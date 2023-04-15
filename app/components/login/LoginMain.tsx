import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Logo from "../Logo";
import InputError from "./InputError";
import InputField from "./InputField";
import InputLabel from "./InputLabel";
import { useLogin } from "@/apis/mutations";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .trim()
    .min(8, "minimum 8 character")
    .required("Required field"),
});

export type LoginType = { email: string; password: string };
let intVal: LoginType = { email: "admin@example.com", password: "" };
const LoginMain = () => {
  let router = useRouter();
  let { isSuccess, mutateAsync } = useLogin();
  let onSubmit = async (
    values: LoginType,
    action: FormikHelpers<LoginType>
  ) => {
    try {
      let { data } = await mutateAsync(values);
      setCookie("auth", data.data.token);
      router.push("/");
      action.setSubmitting(false);
      action.setStatus("");
    } catch (error: any) {
      action.setStatus(error.response.data.message);
    }
  };
  return (
    <>
      <header>
        <Logo className="w-[10rem] absolute top-0 left-0" />
      </header>
      <div className="flex justify-center items-center h-screen">
        <Formik
          initialValues={intVal}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, dirty, status }) => (
            <Form className="bg-white border mx-2 border-gray-300 rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
              <h1 className="text-2xl font-medium mb-4">Login</h1>
              <div className="mb-2">
                <InputLabel htmlFor="email" label="Email" />
                <InputField type="email" name="email" id="email" />
                <InputError name="email" />
              </div>
              <div className="mb-4">
                <InputLabel htmlFor="password" label="Password" />
                <InputField type="password" name="password" id="password" />
                <InputError name="password" />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="login-btn"
                  type="submit"
                  disabled={isSubmitting || isSuccess || !dirty}
                >
                  {isSubmitting || isSuccess ? "Logging in..." : "Login"}
                </button>
              </div>

              {status && <p className="text-red-600 text-md mt-5">{status}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginMain;

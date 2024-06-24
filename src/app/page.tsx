"use client";
import React, { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authActions } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import toast from "react-hot-toast";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// export const metadata: Metadata = {
//   title: "Sign in",
//   description: "Sign in to manage your inventory",
// };

const SignIn: React.FC = () => {

  const schema = yup.object().shape({
    email: yup.string().email("A valid email is required to continue").required(" Email can not be empty"),
    password: yup.string().required("Password cannot be empty").min(3,"Password mut be at least characters long ")
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useAppDispatch();

  const router = useRouter();

  function handleFormSubmit(data:Record<string,any>) {
    dispatch(authActions.signIn());
    toast.success("Sign in successful");
    router.push("/dashboard/");
  }
  return (
    <section className="  bg-gray-50 bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a
          href="#"
          className="text-gray-900 mb-6 flex items-center text-2xl font-semibold "
        >
          <Image
            className="h-12 w-12"
            src={"/images/logo/logo.png"}
            width={100}
            height={100}
            alt="Logo"
          />
          Doxa inventory
        </a>
        <div className="bg-gray-800 border-gray-700 w-full rounded-lg border bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-gray-900 text-xl font-bold leading-tight tracking-tight md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-900 mb-2 block text-sm font-medium "
                >
                  Your email
                </label>
                <input
                  type="email"
                  // name="email"
                  {...register("email")}
                  id="email"
                  className="bg-gray-50 border-gray-300 text-gray-900 bg-gray-700 border-gray-600 placeholder-gray-400 block w-full rounded-lg border p-2.5 focus:border-blue-500 focus:ring-violet-600   sm:text-sm"
                  placeholder="name@company.com"
                  required
                />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-gray-900 mb-2 block text-sm font-medium "
                >
                  Password
                </label>
                <input
                  type="password"
                  // name="password"
                  {...register("password")}
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border-gray-300 text-gray-900 bg-gray-700 border-gray-600 placeholder-gray-400 block w-full rounded-lg border p-2.5 focus:border-violet-600 focus:ring-violet-600 sm:text-sm "
                  required
                />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

              </div>
              {/* <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-violet-600 hover:underline text-violet-500"
                >
                  Forgot password?
                </a>
              </div> */}
              <button
                // disabled={}
                type="submit"
                className="w-full rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 "
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

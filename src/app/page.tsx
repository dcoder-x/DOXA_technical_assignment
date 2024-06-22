"use client"
import React, { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authActions } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import toast from "react-hot-toast";


// export const metadata: Metadata = {
//   title: "Sign in",
//   description: "Sign in to manage your inventory",
// };

const SignIn: React.FC = () => {

  const dispatch = useAppDispatch()

  const router = useRouter()

  function handleFormSubmit(e:FormEvent) {
    e.preventDefault()
    dispatch(authActions.signIn())
    toast.success("Sign in successful")
    router.push("/dashboard/")
  }
  return (
<section className="  bg-gray-50 bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Image src={""} alt="Doxa logo"/>
          Doxa inventory 
        </a>
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400   focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 "
                  required
                />
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
                className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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

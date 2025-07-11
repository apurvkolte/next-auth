"use client";
import { useState, useEffect } from "react";
import { loadUser } from '@/store/actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaGoogle, FaGithub, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, formState: { errors }, reset, } = useForm();
  const { user, success, message, error } = useSelector((state) => state.auth);
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    // if (success && message && status === "unauthenticated") {
    //   // toast.success(message);
    //   MySwal.fire({
    //     title: "Login Successful!",
    //     text: "You will be redirected to the home page shortly.",
    //     icon: "success",
    //     timer: 3000,
    //     showConfirmButton: false,
    //   }).then(() => {
    //     // router.push("/");
    //   });
    // }

    if (error) {
      toast.error(error);
    }
  }, [success, message, error]);


  // const loginUser = async (e) => {
  //   e.preventDefault();

  //   dispatch(loadUser({ email, password }));
  // };

  const loginUser = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result.ok) {
      MySwal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      toast.error(result.error || "Login failed");
    }
  };


  const logoutUser = () => {
    signOut({ redirect: false });
    toast.success("Logged out");
  }


  return (
    <div className="min-h-screen flex flex-col gap-20">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm border shadow-lg mt-20 bg-gray-50 ">

        <div >
          <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {session ? "Welcome Back" : "Sign in to your account"}
          </h2>
        </div>

        {!session ? (
          <div className="mt-10 ">
            <form className="space-y-6" onSubmit={handleSubmit(loginUser)}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 ${errors.email ? 'outline-red-500' : 'outline-gray-300'
                      } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 ${errors.password ? 'outline-red-500' : 'outline-gray-300'
                      } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>


            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500"> Sign up</a>
            </p>

            <div className="space-y-4 mt-5">
              <button
                onClick={() => signIn('google')}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200"
              >
                <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
                Continue with Google
              </button>

              <button
                onClick={() => signIn('github')}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800"
              >
                <FaGithub className="w-5 h-5 mr-3" />
                Continue with GitHub
              </button>

              <button
                onClick={() => signIn('facebook')}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600"
              >
                <FaFacebook className="w-5 h-5 mr-3" />
                Continue with Facebook
              </button>

              <button
                onClick={() => signIn('linkedin')}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-700"
              >
                <FaLinkedin className="w-5 h-5 mr-3" />
                Continue with LinkedIn
              </button>

              <button
                onClick={() => signIn('twitter')}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400"
              >
                <FaTwitter className="w-5 h-5 mr-3" />
                Continue with Twitter
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={logoutUser} className="w-[50%] py-2 mt-5 mx-auto px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</button>
        )}
      </div>

      <div className="mt-auto mb-10">
        <div className="flex flex-col justify-center items-center py-8 bg-slate-50 shadow-lg rounded mx-auto max-w-md">
          {session ? <h1 className="text-lg py-3 ">
            {session.user.email}
          </h1> : <h1 className="text-lg py-3">No Login User</h1>}

          <div className="flex gap-3 py-3  justify-center items-center px-6">
            <Link
              href='/user-profile'
              className="w-full md:w-auto inline-flex items-center justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              User Profiles
            </Link>

            <Link
              href='/users'
              className="w-full md:w-auto inline-flex items-center justify-center text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-200"
            >
              All Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

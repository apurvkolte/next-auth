"use client";
import { useEffect } from "react";
import { register as registerUserAction } from '@/store/actions/userActions';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { RESET_SUCCESS } from "@/store/constants/userConstants";
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { success, error, message } = useSelector((state) => state.auth);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (success && message) {
      MySwal.fire({
        title: "Account created!",
        text: message,
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        router.push("/");
      });
      dispatch({ type: RESET_SUCCESS });
    }
    if (error) {
      toast.error(error);
    }
  }, [success, message, error, dispatch, router]);

  const onSubmit = async (data) => {
    dispatch(registerUserAction({
      email: data.email,
      password: data.password,
    }));
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm border shadow-lg mt-10 bg-gray-50">
      <div>
        <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign up to your account</h2>
      </div>

      <div className="mt-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                className={`block w-full rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none border ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                className={`block w-full rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none border ${errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</a>
        </p>
      </div>
    </div>
  );
}

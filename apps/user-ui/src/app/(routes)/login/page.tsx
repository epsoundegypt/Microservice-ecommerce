"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full py-10 min-h-[85vh] md:mt-24">
      <div className="w-full flex justify-center">
        <div className="w-[80%] md:w-[480px] p-10 shadow rounded-2xl bg-white border">
          <Image
            src="/icon.svg"
            alt="logo"
            width={40}
            height={40}
            className="mx-auto mb-3"
          ></Image>
          <h3 className="text-[1.5rem] font-semibold text-center mb-2">
            Login to Goodwell
          </h3>

          <p className="text-center text-gray-500 mb-6">
            Don’t have an account?{" "}
            <span
              className="text-primary cursor-pointer font-semibold"
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </span>
          </p>

          {/* Server Error */}
          {serverError && (
            <p className="w-full bg-red-100 text-red-600 px-3 py-2 rounded mb-3 text-sm">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Google Login */}
            <button
              type="button"
              className="w-full border px-4 py-3 rounded-lg flex items-center justify-center gap-3 font-medium hover:bg-gray-50 transition"
            >
              <img src="/google.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="h-[1px] bg-gray-300 w-full" />
              <span className="text-gray-500 text-sm">OR</span>
              <div className="h-[1px] bg-gray-300 w-full" />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email is invalid",
                  },
                })}
                className="border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="font-medium mb-1">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter password Min 6 characters"
                {...register("password", { required: "Password is required", minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                } })}
                className="border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-primary"
              />

              <div
                className="absolute right-4 top-[45px] cursor-pointer text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>

              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </div>

              <span
                className="text-primary text-sm cursor-pointer"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

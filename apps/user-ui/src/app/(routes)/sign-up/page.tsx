"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState<FormData | null>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    if (!agreeToTerms) {
      setServerError("Please agree to the terms and conditions");
      return;
    }
    console.log(data);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < inputRefs.current.length - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const handelOtpKyeDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div className="w-full py-10 min-h-[85vh] md:mt-10">
      <div className="w-full flex justify-center">
        <div className="w-[80%] md:w-[480px] p-10 shadow rounded-2xl bg-white border">
          <Image
            src="/icon.svg"
            alt="logo"
            width={40}
            height={40}
            className="mx-auto mb-3"
          ></Image>
          {showOtp && (
            <>
              <h3 className="text-[1.5rem] font-semibold text-center mb-2">
                Create your account
              </h3>

              <p className="text-center text-gray-500 mb-6">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer font-semibold"
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              </p>
            </>
          )}

          {/* Server Error */}
          {serverError && (
            <p className="w-full bg-red-50 text-red-600 px-3 py-2 rounded mb-3 text-sm text-center">
              {serverError}
            </p>
          )}

          {showOtp ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Google Sign Up */}
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

              {/* Full Name */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className="border rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </span>
                )}
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
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
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

              {/* Confirm Password */}
              <div className="flex flex-col relative">
                <label className="font-medium mb-1">Confirm Password</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-primary"
                />

                <div
                  className="absolute right-4 top-[45px] cursor-pointer text-gray-500"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </div>

                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={() => setAgreeToTerms(!agreeToTerms)}
                  className="w-4 h-4 mt-1"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-primary cursor-pointer font-semibold">
                    Terms and Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-primary cursor-pointer font-semibold">
                    Privacy Policy
                  </span>
                </span>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Create Account
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* OTP Header */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">
                  Verify Your Email
                </h3>
                <p className="text-gray-500 text-sm">
                  We've sent a 6-digit code to{" "}
                  <span className="font-semibold text-gray-700">
                    {userData?.email || "your email"}
                  </span>
                </p>
              </div>

              {/* OTP Input Fields */}
              <div className="flex justify-center gap-3">
                {otp?.map((digit, index) => {
                  return (
                    <input
                      type="text"
                      key={index}
                      value={digit}
                      className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-xl outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-gray-400"
                      ref={(el) => {
                        if (el) inputRefs.current[index] = el;
                      }}
                      maxLength={1}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handelOtpKyeDown(index, e)}
                    />
                  );
                })}
              </div>

              {/* Verify Button */}
              <button
                type="button"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Verify Email
              </button>

              {/* Resend Section */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">
                  Didn't receive the code?
                </p>
                {canResend ? (
                  <button
                    type="button"
                    className="text-primary font-semibold text-sm hover:underline"
                  >
                    Resend Code
                  </button>
                ) : (
                  <p className="text-sm text-gray-400">
                    Resend code in{" "}
                    <span className="font-semibold text-gray-600">
                      {timer}s
                    </span>
                  </p>
                )}
              </div>

              {/* Back to signup */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowOtp(false)}
                  className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← Back to Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

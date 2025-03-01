"use client";
import ErrorMsg from "@/app/components/common/error-msg";
import { useLoginAdminMutation } from "@/redux/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginForm = () => {
  const [loginAdmin, { data: loginData }] = useLoginAdminMutation();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle checkbox toggle
  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe(event.target.checked);
  };

  // Populate fields if user details are found in localStorage
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const { email } = JSON.parse(userDetails);
      setValue("email", email);
      setRememberMe(true);
    }
  }, [setValue]);

  // onSubmit
  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await loginAdmin({
      email: data.email,
      password: data.password,
    });

    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Login successfully");

      // Handle Remember Me functionality
      if (rememberMe) {
        const userDetails = { email: data.email };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      } else {
        localStorage.removeItem("userDetails");
      }

      router.push("/profile");
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Email <span className="text-red">*</span>
        </p>
        <input
          {...register("email", { required: `Email is required!` })}
          name="email"
          id="email"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="email"
          placeholder="Enter Your Email"
        />
        <ErrorMsg msg={errors.email?.message as string} />
      </div>

      <div className="mb-5 relative">
        <p className="mb-0 text-base text-black">
          Password <span className="text-red">*</span>
        </p>
        <div className="relative">
          <input
            {...register("password", { required: `Password is required!` })}
            id="password"
            className="input w-full h-[49px] rounded-md border border-gray6 px-6 pr-12 text-base"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        <ErrorMsg msg={errors.password?.message as string} />
      </div>

      <div className="flex items-center justify-between">
        <div className="tp-checkbox flex items-start space-x-2 mb-3">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me" className="text-tiny">
            Remember Me
          </label>
        </div>
        <div className="mb-4">
          <a
            href="/admin/forgot-password"
            className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
          >
            Forgot Password ?
          </a>
        </div>
      </div>

      <button type="submit" className="tp-btn h-[49px] w-full justify-center">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;

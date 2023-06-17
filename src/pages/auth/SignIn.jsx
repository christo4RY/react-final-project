import React, { useState } from "react";
import { PasswordInput, TextInput, Button, Loader } from "@mantine/core";
import { MdAlternateEmail } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { FcBusinessContact } from "react-icons/fc";
import { AiOutlineUser } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useSetUserMutation } from "../../store/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import InputError from "../../components/errors/InputError";

const schema = yup
  .object({
    name: yup.string().min(3).required(),
    email: yup.string().required(),
    password: yup.string().min(6).required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passsword does not match"),
  })
  .required();

const SignIn = () => {
  const [setUser, { isLoading }] = useSetUserMutation();
  const [error, setError] = useState("");
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const res = await setUser(data);
    res.data?.success && nav("/signup");
    if (res.error) {
      const {
        data: { message },
      } = res.error;
      setError(message);
    }
  };
  return (
    <div>
      <h1 className="text-purple-600 mb-3 text-2xl uppercase text-center font-bold">
        Sign In
      </h1>
      <div className="w-full p-6 py-7  rounded  md:w-1/2 lg:w-1/3 mx-auto shadow-lg">
        <form className=" flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register("name")}
            label="Name"
            placeholder="name"
            icon={<AiOutlineUser size="0.8rem" />}
          />
          <InputError message={errors.name?.message} />
          <TextInput
            {...register("email")}
            className="mt-3"
            label="Email"
            placeholder="email"
            icon={<MdAlternateEmail size="0.8rem" />}
          />
          <InputError message={errors.email?.message ?? error} />
          <PasswordInput
            {...register("password")}
            className="mt-3"
            label="Password"
            placeholder="password"
            icon={<Si1Password size="0.8rem" />}
          />
          <InputError message={errors.password?.message} />
          <PasswordInput
            {...register("password_confirmation")}
            className="mt-3"
            label="Confirm Password"
            placeholder="confirm password"
            icon={<Si1Password size="0.8rem" />}
          />
          <InputError message={errors.password_confirmation?.message} />

          {isLoading && (
            <Loader
              size="sm"
              className="mt-2 self-end  hover:bg-purple-500 duration-100 transition-colors hover:border-0 hover:text-white border-purple-600 text-purple-600  text-sm"
              variant="bars"
            />
          )}
          {!isLoading && (
            <Button
              type="submit"
              variant="outline"
              size="xs"
              className="mt-2 self-end  hover:bg-purple-500 duration-100 transition-colors hover:border-0 hover:text-white border-purple-600 text-purple-600  text-sm"
              leftIcon={<FcBusinessContact size="1.3rem" />}
            >
              Sign In
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;

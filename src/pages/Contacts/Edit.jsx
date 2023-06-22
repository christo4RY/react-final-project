import { Button, Loader, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import InputError from "../../components/errors/InputError";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "../../store/api/contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const schema = yup
  .object({
    name: yup.string().required(),
    phone: yup.string().min(9).required(),
    email: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

const Edit = () => {
  const { id } = useParams();
  const [updateContact, { isLoading: load }] = useUpdateContactMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuth());
  }, []);
  const { auth } = useSelector((state) => state);
  const { data, isError, isLoading } = useGetContactQuery({
    token: auth.token,
    id,
  });
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data?.contact.name,
      phone: data?.contact.phone,
      email: data?.contact.email,
      address: data?.contact.address,
    },
  });

  useEffect(() => {
    reset({
      name: data?.contact.name,
      phone: data?.contact.phone,
      email: data?.contact.email,
      address: data?.contact.address,
    });
  }, [data]);
  const [error,setError] = useState("")
  const submit = async (req) => {
    const {data ,error} = await updateContact({ token: auth.token, id, data: req });
    setError(error?.data.message)
    
    data?.success && nav("/dashboard");
  };
  if (isLoading) {
    return (
      <div className="w-[90%] sm:w-[60%] md:w-[40%] mx-auto my-7 p-7 shadow-lg">
        <SkeletonTheme baseColor="#e2e8f0" highlightColor="#a3ffc6">
          <Skeleton height={43} className=" mb-4" />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className="w-[90%] sm:w-[60%] md:w-[40%] mx-auto my-7 p-7 shadow-lg">
      <h1 className="text-teal-500 text-2xl font-bold uppercase mb-3">
        Edit Contact
      </h1>
      <form className=" flex flex-col" onSubmit={handleSubmit(submit)}>
        <div className=" grid grid-cols-2 space-x-3">
          <TextInput
            {...register("name")}
            label="Name"
            placeholder="name"
            icon={<AiOutlineUser size="0.8rem" />}
          />
          <TextInput
            {...register("phone")}
            placeholder="09******"
            label="Phone"
            icon={<MdAlternateEmail size="0.8rem" />}
          />
          <InputError message={errors.name?.message} />
          <InputError message={errors.phone?.message} />
        </div>
        <TextInput
          {...register("email")}
          className="mt-3"
          label="Email"
          placeholder="example@gmail.com"
          icon={<MdAlternateEmail size="0.8rem" />}
        />
        <InputError message={errors.email?.message ?? error} />
        <TextInput
          {...register("address")}
          className="mt-3"
          label="Address"
          placeholder="yangon,myanmar"
          icon={<CiLocationOn size="0.8rem" />}
        />
        <InputError message={errors.address?.message} />
        {load && (
          <Loader
            size="sm"
            className=" mx-auto text-teal-500 transition-colors mt-4"
            variant="bars"
          />
        )}
        {!load && (
          <Button
            type="submit"
            disabled={load && true}
            className=" bg-teal-500 hover:bg-teal-600 transition-colors mt-4"
          >
            Update
          </Button>
        )}
      </form>
    </div>
  );
};

export default Edit;

import { Button, TextInput } from "@mantine/core";
import React, { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { useParams } from "react-router-dom";
import InputError from "../../components/errors/InputError";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import { useGetContactQuery } from "../../store/api/contact";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuth());
  }, []);
  const { auth } = useSelector((state) => state);
  const { data, isError, isLoading } = useGetContactQuery({
    token: auth.token,
    id,
  });

  const {
    register,
    handleSubmit,
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
  console.log(data?.contact);
  const submit = (data) => {
    alert('coming')
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
        <InputError message={errors.email?.message} />
        <TextInput
          {...register("address")}
          className="mt-3"
          label="Address"
          placeholder="yangon,myanmar"
          icon={<CiLocationOn size="0.8rem" />}
        />
        <InputError message={errors.address?.message} />
        <Button
          type="submit"
          className=" bg-teal-500 hover:bg-teal-600 transition-colors mt-4"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default Edit;

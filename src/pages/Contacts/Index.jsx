import React, { useEffect, useState } from "react";
import { NumberInput, PasswordInput, Table, TextInput } from "@mantine/core";
import {
  useDeleteContactMutation,
  useGetAllContactQuery,
  useSetNewContactMutation,
} from "../../store/api/contact";
import { getAuth } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BiDotsVerticalRounded, BiEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputError from "../../components/errors/InputError";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Menu, Text } from "@mantine/core";

const schema = yup
  .object({
    name: yup.string().required(),
    phone: yup.string().min(9).required(),
    email: yup.string().required(),
    address: yup.string().required(),
  })
  .required();

const Index = () => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuth());
  }, []);

  const { auth } = useSelector((state) => state);
  const { data, isLoading } = useGetAllContactQuery(auth.token);
  const [newContact] = useSetNewContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const [opened, { open, close }] = useDisclosure(false);

  const rows = data?.contacts?.data.map((contact) => (
    <tr key={contact.id}>
      <td>
        <Link
          to={`contact/${contact.id}`}
          className="text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded"
        >
          {contact.name}
        </Link>
      </td>
      <td>{contact.phone ?? "-"}</td>
      <td>{contact.email ?? "-"}</td>
      <td>{contact.address ?? "-"}</td>
      <td >
        <Menu shadow="md" width={120}>
          <Menu.Target>
            <button>
              <BiDotsVerticalRounded />
            </button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item color="yellow" icon={<BiEditAlt />}>
              <Link to={`/dashboard/edit/${contact.id}`}>Edit</Link>
            </Menu.Item>
            <Menu.Item color="red" icon={<FaTrash />}>
              <div
                onClick={async () => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await deleteContact({
                        token: auth.token,
                        id: contact.id,
                      });
                      Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                      );
                    }
                  });
                }}
              >
                Delete
              </div>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  const submit = async (data) => {
    const { data: res } = await newContact({ token: auth.token, data: data });
    if (res.success) {
      close();
      resetField("name");
      resetField("phone");
      resetField("email");
      resetField("address");
    }
  };

  return (
    <div className="mt-7 p-3 shadow-lg w-full  sm:w-[95%] mx-auto">
      <Modal opened={opened} onClose={close} title="Create Contact" centered>
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
            Save
          </Button>
        </form>
      </Modal>
      <div className="my-2">
        <button
          onClick={open}
          className="py-0.5 rounded text-sm px-3 hover:bg-green-200 hover:text-green-700 transition-colors bg-green-100/60 text-green-500 font-bold uppercase"
        >
          Create
        </button>
      </div>
      <div className="w-full overflow-x-scroll">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
      {isLoading && <Skeleton className="w-full" height={37} count={7} />}
    </div>
  );
};

export default Index;

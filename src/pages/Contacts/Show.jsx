import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetContactQuery } from "../../store/api/contact";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Show = () => {
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
  return (
    <div className="w-[80%] sm:w-[60%] md:w-[40%] shadow-lg p-7 mt-7 mx-auto">
      {isLoading && (
        <div>
          <SkeletonTheme baseColor="#e2e8f0" highlightColor="#a3ffc6">
            <Skeleton height={35} />
            <Skeleton height={23} />
            <Skeleton height={23} />
            <Skeleton height={23} />
          </SkeletonTheme>
        </div>
      )}
      {isError && <h className="text-red-600 uppercase text-2xl">Not Found Contact!</h>}
      <h1 className="text-xl font-bold">{data?.contact?.name}</h1>
      <h1 className="mt-2 text-gray-500">{data?.contact?.phone}</h1>
      <h1 className="mt-2 text-gray-500">{data?.contact?.email}</h1>
      <h1 className="mt-2 mb-3 text-gray-500">{data?.contact?.address}</h1>
      <Link
        className=" py-1 px-4 hover:bg-teal-200 rounded transition-colors bg-teal-100/60 text-teal-600"
        to="/dashboard"
      >
        Back
      </Link>
    </div>
  );
};

export default Show;

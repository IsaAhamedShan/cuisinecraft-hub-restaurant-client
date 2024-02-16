import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = categoryName => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["manageItem"],
    queryFn: async () => {
      const res = await axiosPublic.get("/menu");
      const filteredData = categoryName
      ? res.data.filter(item => item.category === categoryName)
      : res.data;
      console.log(filteredData);
      return filteredData;
    },
  });

  return [data, isLoading, refetch];
};

export default useMenu;

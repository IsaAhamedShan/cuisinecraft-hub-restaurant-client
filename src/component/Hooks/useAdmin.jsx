import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user,loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin,isPending:isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin/${user.email}`);
      console.log("inside use admin ", res.data.admin);
      return res.data?.admin;
    },
    
  });
  console.count("inside use admin")
  return [isAdmin,isAdminLoading];
};

export default useAdmin;

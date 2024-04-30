import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { IoIosPeople } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFastfood } from "react-icons/md";
import { GrMoney } from "react-icons/gr";

const AdminHome = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      let response = await axiosSecure.get("admin-stats");
      console.log("data in admin home: ", response.data);
      return response.data;
    },
  });
  return (
    <>
      <div className="flex justify-center items-center ">
        <p className="text-4xl font-bold mt-8 mb-6 text-center">
          Restaurant Stats
        </p>
      </div>
      <div className="max-w-7xl m-auto flex justify-center items-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <GrMoney className="text-3xl text-pink-500" />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">{data && data?.revenue}</div>
            {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <IoIosPeople className="text-3xl text-pink-500" />
            </div>
            <div className="stat-title">Users</div>
            <div className="stat-value">{data && data?.users}</div>
            {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <TbTruckDelivery className="text-3xl text-pink-500" />
            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">{data && data?.orders}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <MdFastfood className="text-3xl text-pink-500" />
            </div>
            <div className="stat-title">Items</div>
            <div className="stat-value">{data && data?.menuItems}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;

import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { GrMoney } from "react-icons/gr";
import { MdFastfood } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import AdminHomeTowerChart from "../AdminHome/AdminHomeTowerChart";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import UserHomePieChart from "./UserHomePieChart";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [totalExpenses, setTotalExpenses] = useState(
    <div className="flex justify-center items-center">
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
  const [totalItem, setTotalItem] = useState(<div className="flex justify-center items-center">
  <span className="loading loading-spinner loading-md"></span>
</div>);
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["admin-stats", user],
    queryFn: async () => {
      let responseAdminStats = await axiosSecure.get("admin-stats");
      let responseSoldStats = await axiosSecure.get(
        `/userPaymentHistory?email=${user?.email}`
      );
      console.log(
        "data in admin home: ",
        responseAdminStats.data,
        responseSoldStats.data
      );

      setTotalExpenses(
        responseSoldStats.data.reduce(
          (sum, current) => (sum += current.revenue),
          0
        )
      );
      setTotalItem(
        responseSoldStats.data.reduce(
          (sum, current) => (sum += current.quantity),
          0
        )
      );

      return [responseSoldStats.data, responseAdminStats.data];
    },
  });
  return (
    <>
      <div>
        <div className="flex justify-center items-center ">
          <p className="text-4xl font-bold mt-8 mb-6 text-center">
            Restaurant Stats
          </p>
        </div>
        <div className="max-w-7xl m-auto flex justify-center items-center">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <GrMoney className="text-3xl text-blue-500" />
              </div>
              <div className="stat-title">Total Expenses</div>
              <div className="stat-value font-normal">{totalExpenses}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <TbTruckDelivery className="text-3xl text-blue-500" />
              </div>
              <div className="stat-title">Orders</div>
              <div className="stat-value font-normal">
                {data && data[1].orders}
              </div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <MdFastfood className="text-3xl text-blue-500" />
              </div>
              <div className="stat-title">Total items</div>
              <div className="stat-value font-normal">
                {totalItem}
              </div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
          </div>
        </div>
      </div>
      {/* charts */}
      <div className="flex justify-center items-center flex-wrap gap-6  md:gap-8 md:mt-20 lg:gap-12">
        <div className="flex flex-col gap-4 justify-center items-center mt-6 md:mt-0">
          <h2 className="text-2xl text-blue-600 ">Expenses</h2>
          {data && (
            <UserHomePieChart
              soldData={data[0]}
              ExpensePerCategory={data[0]}
            ></UserHomePieChart>
          )}
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="text-2xl text-blue-600 ">Brought Items</h2>
          {data && (
            <AdminHomeTowerChart soldData={data[0]}></AdminHomeTowerChart>
          )}
        </div>
      </div>
    </>
  );
};

export default UserHome;

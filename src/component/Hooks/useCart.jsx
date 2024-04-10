import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";
const useCart = () => {
  //if i use useState to set data then refetch wont work cause it is not directly connected to useQuery
    // const [cart, setCart] = useState();
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext)
  const {refetch,data:cart=[]} = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/cartList?email=${user.email}`);
      // setCart(response.data)
      return response.data
    },
  });
  return [cart,refetch];
};

export default useCart;

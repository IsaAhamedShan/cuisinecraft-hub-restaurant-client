import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            
        </div>
    );
};

export default PaymentHistory;
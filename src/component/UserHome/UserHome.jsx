import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const UserHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h2 className="text-3xl">Hi,welcome {user?.displayName?  user.displayName : "Anonymouse"}</h2>
        </div>
    );
};

export default UserHome;
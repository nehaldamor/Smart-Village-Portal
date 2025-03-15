import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const UserLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }, [navigate, setUser]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-2xl font-bold">Logging Out...</h1>
            <p className="text-gray-400 mt-2">Redirecting to login page.</p>
        </div>
    );
};

export default UserLogout;

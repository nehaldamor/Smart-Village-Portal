import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const AdminLogout = () => {
    const navigate = useNavigate();
    const { setAdmin } = useAdmin();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        setAdmin(null);
        setTimeout(() => {
            navigate("/admin-login");
        }, 2000);
    }, [navigate, setAdmin]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-2xl font-bold">Logging Out...</h1>
            <p className="text-gray-400 mt-2">Redirecting to login page.</p>
        </div>
    );
};

export default AdminLogout;

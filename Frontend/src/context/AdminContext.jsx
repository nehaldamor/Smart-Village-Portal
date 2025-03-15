import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(() => {
        return JSON.parse(localStorage.getItem("admin")) || null;
    });

    useEffect(() => {
        if (admin) {
            localStorage.setItem("admin", JSON.stringify(admin));
        } else {
            localStorage.removeItem("admin");
        }
    }, [admin]);

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);

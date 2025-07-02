import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth"; 
import { useContext } from "react";
import { UserContext } from "../../context/userContext"; // Adjust the import path as necessary
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Dashboard = () => {
    useUserAuth();

    const { user } = useContext(UserContext);
    return (
        <DashboardLayout>
            Dashboard           
        </DashboardLayout>
    );
}
export default Dashboard;
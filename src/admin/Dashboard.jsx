import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";

const Dashboard = () => {
  return (
    <div className="">
      {/* Sidebar */}
      <Sidebar>
        {/* Content */}
        <Outlet />
      </Sidebar>
    </div>
  );
};

export default Dashboard;

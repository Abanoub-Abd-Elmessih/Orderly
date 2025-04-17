import { Box, DollarSign, ListOrdered, Users } from "lucide-react";
import { AdminCard } from "../components/admin/AdminCard";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DashboardOverview = () => {
  const UsersStorage = useLocalStorage("users").get() || [];
  const ProductsStorage = useLocalStorage("products").get() || [];
  const OrdersStorage = useLocalStorage("orders").get() || [];

  return (
    <div className="grid grid-cols-12 gap-4">
      <AdminCard title="Users" icon={<Users />} total={UsersStorage.length} />
      <AdminCard title="Products" icon={<Box />} total={ProductsStorage.length} />
      <AdminCard title="Orders" icon={<DollarSign />} total={OrdersStorage.length} />
    </div>
  );
};

export default DashboardOverview;

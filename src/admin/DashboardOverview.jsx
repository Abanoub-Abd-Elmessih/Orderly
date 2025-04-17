import { Box, DollarSign, ListOrdered, Users } from "lucide-react";
import { AdminCard } from "../components/admin/AdminCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useLang from "../hooks/useLang";

const DashboardOverview = () => {
  const UsersStorage = useLocalStorage("users").get() || [];
  const ProductsStorage = useLocalStorage("products").get() || [];
  const OrdersStorage = useLocalStorage("orders").get() || [];
  const {t} = useLang()

  return (
    <div className="grid grid-cols-12 gap-4">
      <AdminCard title={`${t("Users")}`} icon={<Users />} total={UsersStorage.length} />
      <AdminCard title={`${t("Products")}`} icon={<Box />} total={ProductsStorage.length} />
      <AdminCard title={`${t("Order")}`} icon={<DollarSign />} total={OrdersStorage.length} />
    </div>
  );
};

export default DashboardOverview;

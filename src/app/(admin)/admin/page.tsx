import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

const AdminIndexPage = () => {
  redirect(routes.adminProducts);
};

export default AdminIndexPage;

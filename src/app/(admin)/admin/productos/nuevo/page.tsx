import type { Metadata } from "next";
import { AdminNewProductClient } from "@/features/admin/components/admin-new-product-client";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Admin · Nuevo producto",
  description: `Alta de producto — ${siteConfig.name}.`,
};

const AdminNewProductPage = () => {
  return <AdminNewProductClient />;
};

export default AdminNewProductPage;

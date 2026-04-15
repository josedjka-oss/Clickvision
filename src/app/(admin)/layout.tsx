import type { ReactNode } from "react";
import { AdminShell } from "@/features/admin/components/admin-shell";

type AdminGroupLayoutProps = {
  children: ReactNode;
};

const AdminGroupLayout = ({ children }: AdminGroupLayoutProps) => {
  return <AdminShell>{children}</AdminShell>;
};

export default AdminGroupLayout;

import type { ReactNode } from "react";
import { CuentaLayoutClient } from "@/features/auth/components/cuenta-layout-client";

type CuentaLayoutProps = {
  children: ReactNode;
};

const CuentaLayout = ({ children }: CuentaLayoutProps) => {
  return <CuentaLayoutClient>{children}</CuentaLayoutClient>;
};

export default CuentaLayout;

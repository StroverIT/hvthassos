import type { ReactNode } from "react";

type TAdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: TAdminLayoutProps) => (
  <div className="min-h-screen">{children}</div>
);

export default AdminLayout;

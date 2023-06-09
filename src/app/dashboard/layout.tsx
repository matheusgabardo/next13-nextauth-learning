import { ReactNode } from "react";
interface DashboardLayoutProps {
  children: ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <h1>Dashboard layout</h1>
      {children}
    </>
  );
}

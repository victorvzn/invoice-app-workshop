import AdminLayout from '@/layouts/AdminLayout'

import { Outlet } from "react-router";

export const DashboardPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Outlet />
      </div>
    </AdminLayout>
  );
}
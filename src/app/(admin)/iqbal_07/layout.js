import React from "react";
import AdminLayoutClient from "../../../components/admin/AdminLayoutClient/AdminLayoutClient";

export const metadata = {
  title: "Admin Dashboard - Iqbal's Portfolio",
  description: "Secure admin area",
  robots: "noindex, nofollow", // Prevent search engines from indexing the admin panel
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

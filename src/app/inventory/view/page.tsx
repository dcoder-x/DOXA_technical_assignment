import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Product from "@/components/Product";

export const metadata: Metadata = {
  title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {
  return <Product />;
};

export default Settings;

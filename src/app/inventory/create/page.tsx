import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import ProtectedRoute from "@/components/PotectedRoutes";
import CreateProduct from '@/components/CreateProduct';

export const metadata: Metadata = {
  title:
    "Doxa inventory | Technical assignment",
  description: "Dashboard",
};

export default function CreateProducts() {
  return (
    <>
      <ProtectedRoute>
        <CreateProduct/>
      </ProtectedRoute>
    </>
  );
}

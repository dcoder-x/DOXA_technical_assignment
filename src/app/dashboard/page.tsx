import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";
import ProtectedRoute from "@/components/PotectedRoutes";

export const metadata: Metadata = {
  title:
    "Doxa inventory | Technical assignment",
  description: "Dashboard",
};

export default function Home() {
  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          <Dashboard />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
}

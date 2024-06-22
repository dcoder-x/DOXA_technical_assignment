import { Metadata } from "next";
import ProtectedRoute from "@/components/PotectedRoutes";
import Products from "@/components/Products";
import Loader from "@/components/common/Loader";
// import Products from "../create/pages";

export const metadata: Metadata = {
  title: "Doxa inventory | Technical assignment",
  description: "Inventory",
};

export default function Inventory() {
  return (
    <>
      <ProtectedRoute>
        <Products />
      </ProtectedRoute>
    {/* <Loader/> */}

    </>
  );
}

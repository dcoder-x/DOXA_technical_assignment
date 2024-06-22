"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ActionModalTemplate from "@/components/Modals/DeleteModal";
// import placeHolderImage from "../../images/general/placeholder.jpg"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setIsLoading } from "@/lib/slices/loadStateSlice";
import { productType } from "@/types/product";
import EmptyPageLottie from "@/components/Lottie/Empty";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDeleteProductMutation, useGetProductQuery } from "@/lib/services/productQuery";
import Loader from "./common/Loader";

const Product: React.FC = () => {
  // State for modal visibility
  const [show, setShow] = useState(false);
  const router = useRouter();
  //  product details from the global store
  const product: productType = useAppSelector((state) => state.product.product);
  const dispatch = useAppDispatch();
  const { data: productData, isLoading } = useGetProductQuery(
    product.id as number,
  );

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()
  const setLoaderState = (state: boolean) => dispatch(setIsLoading);

  //   const [productData, setProductData] = useState<productType>(product);

  // Modal controls
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);


  useEffect(() => {
    // // Redirect if product is not available and fetch product details on mount

    console.log(productData)
    if(!productData && !isLoading){
        toast.error("Error loading product, redirecting to inventory")
        router.push("/inventory/all");
    }
  }, [isLoading]);

  // delete product from inventory

  async function deleteproduct() {
    try {
        await deleteProduct(product.id as number).unwrap()
        router.back()
    } catch (error: any) {
      toast.error(error?.message);
      console.log(error);
    }
  }

  if (product) {
    return (
      <>
        <DefaultLayout>
          <div className="mx-auto max-w-270">
            {/* Breadcrumb component */}
            <Breadcrumb pageName="View product" />
            <div className="bg-gray-100 dark:bg-gray-800 py-8">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="-mx-4 flex flex-col md:flex-row">
                  {/* product Image and action buttons */}
                  <div className="px-4 md:flex-1">
                    <div className="bg-gray-300 dark:bg-gray-700 mb-4 h-[460px] rounded-lg">
                      <img
                        className="h-full w-full rounded-lg  object-cover"
                        src={""}
                        alt="Product Image"
                      />
                    </div>
                    <div className="-mx-2 mb-4 flex">
                      <div className="w-1/2 px-2">
                        {/* Button to activate/suspend product */}
                        <Link
                          href={"edit"}
                          className="bg-gray-900 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700 w-full whitespace-nowrap rounded-full bg-violet-800 px-4 py-2 font-bold text-white"
                        >
                          Edit product
                        </Link>
                      </div>
                      <div className="w-1/2 px-2">
                        {/* Button to delete product */}
                        <button
                          onClick={openModal}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-800 bg-red-500 hover:bg-gray-300 dark:hover:bg-gray-600 w-full whitespace-nowrap rounded-full bg-red px-4 py-2 font-bold dark:text-white"
                        >
                          Delete product
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* product name */}
                  <div className="px-4 md:flex-1">
                    <h2 className="text-gray-800 mb-2 text-2xl font-bold dark:text-white">
                      {productData?.name}
                    </h2>
                    <div className="mb-4">
                      <div className="my-4">
                        {/* Display product creation date */}
                        <span className="text-gray-700 dark:text-gray-300 font-bold">
                          Date Created:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          {new Date().toDateString()}
                        </span>
                      </div>
                      <div>
                        {/* Display product category */}
                        <span className="text-gray-700 dark:text-gray-300 font-bold">
                          Category:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          {productData?.category || "not provided"}
                        </span>
                      </div>
                      <div>
                        {/* Display product price*/}
                        <span className="text-gray-700 dark:text-gray-300 font-bold">
                          Price:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          $ {productData?.price || "Not provided"}
                        </span>
                      </div>
                    </div>
                    <div>
                      {/* Display product price*/}
                      <span className="text-gray-700 dark:text-gray-300 font-bold">
                        Quantity:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 mx-2">
                        $ {productData?.quantity || "0"}
                      </span>
                    </div>
                    <div>
                    {/* Display product price*/}
                    <span className="text-gray-700 dark:text-gray-300 font-bold">
                      Available products:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 mx-2">
                      {productData?.units_available || "Not provided"}
                    </span>
                  </div>
                  </div>
     
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>

        {/* Delete product Modal */}
        <ActionModalTemplate
          acceptButtonText="Delete"
          show={show}
          title="Delete product"
          body="Are you sure you want to delete this product, the action can not be undone."
          onAccept={deleteproduct}
          onClose={closeModal}
        />
        {isLoading && <Loader />}
      </>
    );
  }
  return <EmptyPageLottie />;
};

export default Product;

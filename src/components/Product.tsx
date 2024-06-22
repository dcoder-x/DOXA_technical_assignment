"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ActionModalTemplate from '@/components/Modals/DeleteModal';
// import placeHolderImage from "../../images/general/placeholder.jpg"
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setIsLoading } from '@/lib/slices/loadStateSlice';
import { productType } from '@/types/product';
import EmptyPageLottie from '@/components/Lottie/Empty';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Product: React.FC = () => {
  // State for modal visibility
  const [show, setShow] = useState(false);
  const router = useRouter()



  //  product details from the global store
  const product = useAppSelector((state)=>state.product.product)
  const dispatch = useAppDispatch()

  const setLoaderState = (state:boolean) => dispatch(setIsLoading)

  const [productData, setproduct] = useState<productType>(product);



  // Modal controls
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  // Fetch product details from the server
  async function getProduct() {
    try {
      if (setLoaderState) {
        setLoaderState(true);
      }
      const response = await axios.get(
        ``,
      );
      if (response.status === 200) {
        setproduct(response.data.product);
        if (setLoaderState) {
          setLoaderState(false);
        }
      }
    } catch (error: any) {
      if (setLoaderState) {
        setLoaderState(false);
      }
      toast.error(error?.message);
      console.log(error, 'error from suspend product');
    }
  }

  useEffect(() => {
    // // Redirect if product is not available and fetch product details on mount
    // !productData ? router.push('/inventory/all') : getProduct();
  }, []);

  // product operations (modal actions)

  async function deleteproduct() {
    try {
      if (setLoaderState) {
        setLoaderState(true);
      }
      const response = await axios.delete(
        `https://api.agapechristianministries.com/api/product/delete_product/${product.id}`,
      );
      if (response.status === 201) {
        if (setLoaderState) {
          setLoaderState(false);
        }
        router.push('/inventory/all');
      }
    } catch (error: any) {
      if (setLoaderState) {
        setLoaderState(false);
      }
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
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                  {/* product Image and action buttons */}
                  <div className="md:flex-1 px-4">
                    <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                      <img
                        className="w-full h-full object-cover  rounded-lg"
                        src={""}
                        alt="Product Image"
                      />
                    </div>
                    <div className="flex -mx-2 mb-4">
                      <div className="w-1/2 px-2">
                        {/* Button to activate/suspend product */}
                        <Link
                        href={"edit"}
                          className="w-full bg-gray-900 dark:bg-gray-600 text-white font-bold hover:bg-gray-800 dark:hover:bg-gray-700 bg-violet-800 px-4 py-2 rounded-full"
                        >
                            Edit product
                        </Link>
                      </div>
                      <div className="w-1/2 px-2">
                        {/* Button to delete product */}
                        <button
                          onClick={openModal}
                          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 bg-red-500 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Delete product
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* product name */}
                  <div className="md:flex-1 px-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {productData?.name }
                    </h2>
                    <div className="mb-4">
                      <div className="my-4">
                        {/* Display product creation date */}
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Date Created:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          {new Date().toDateString()}
                        </span>
                      </div>
                      <div>
                        {/* Display product category */}
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Category:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          {productData?.category || 'not provided'}
                        </span>
                      </div>
                      <div>
                        {/* Display product price*/}
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Price:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          $ {productData?.price || 'Not provided'}
                        </span>
                      </div>
                    </div>
                    <div>
                        {/* Display product price*/}
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Quantity:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          $ {productData?.quantity || '0'}
                        </span>
                      </div>
                  </div>
                  <div>
                        {/* Display product price*/}
                        <span className="font-bold text-gray-700 dark:text-gray-300">
                          Available products:
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 mx-2">
                          $ {productData?.units_available || 'Not provided'}
                        </span>
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
      </>
    );
  }
  return <EmptyPageLottie/>;
};

export default Product;

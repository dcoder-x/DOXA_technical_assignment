"use client";
import { FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import DefaultLayout from "./Layouts/DefaultLayout";
import Breadcrumb from "./Breadcrumbs/Breadcrumb";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/lib/services/productQuery";
import { useRouter } from "next/navigation";
import Loader from "./common/Loader";
import { useAppSelector } from "@/hooks/redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the form validation schema using yup
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price is required"),
    category: yup.string().required("Category is required"),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .required("Quantity is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

interface FormValues {
  name: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
}

const EditProduct = () => {
  const router = useRouter();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const currentProduct = useAppSelector((state) => state.product.product);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { data: productData, isLoading: isFetching } = useGetProductQuery(
    currentProduct.id as number,
  );

  useEffect(() => {
    if (!productData && !isFetching) {
      toast.error("Error loading product, redirecting to inventory");
      router.push("/inventory/all");
    }

    // Set form default values
    if (productData) {
      setValue("name", productData.name);
      setValue("price", productData.price);
      setValue("category", productData.category);
      setValue("quantity", productData.quantity);
      setValue("description", productData.description as string);
    }
  }, [isFetching, productData, router, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await updateProduct({ ...data, id: productData?.id as number }).unwrap();
      router.push("/inventory/all");
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong, unable to update product",
      );
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Edit Product" />

        <div className="gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit product
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          id="name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="price"
                          {...register("price")}
                        />
                        {errors.price && (
                          <p className="text-red-500">{errors.price.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        id="category"
                        {...register("category")}
                      />
                      {errors.category && (
                        <p className="text-red-500">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="quantity"
                    >
                      Quantity
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                      id="quantity"
                      {...register("quantity")}
                    />
                    {errors.quantity && (
                      <p className="text-red-500">{errors.quantity.message}</p>
                    )}
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        id="description"
                        rows={6}
                        {...register("description")}
                      ></textarea>
                      {errors.description && (
                        <p className="text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                      disabled={isLoading}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </DefaultLayout>
  );
};

export default EditProduct;

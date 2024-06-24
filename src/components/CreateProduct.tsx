"use client";
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import DefaultLayout from './Layouts/DefaultLayout';
import Breadcrumb from './Breadcrumbs/Breadcrumb';
import { useAddProductMutation } from '@/lib/services/productQuery';
import { useRouter } from "next/navigation";
import Loader from './common/Loader';

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  category: yup.string().required("Category is required"),
  quantity: yup.number().required("Quantity is required").integer("Quantity must be an integer").positive("Quantity must be a positive number"),
  description: yup.string().required("Description is required")
});

const CreateProduct = () => {
  const router = useRouter();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleForm(data: Record<string, any>) {
    try {
      await addProduct(data).unwrap();
      toast.success("Product created successfully")
      router.back();
    } catch (error: any) {
      toast.error(error?.message||"something went wrong, try again");
      console.log(error);
    }
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Create Product" />

        <div className="gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Create a product
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit(handleForm)}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="name">
                        Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                        //   name="name"
                          id="name"
                          placeholder="Enter product name"
                          {...register('name')}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="price">
                        Price
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                        //   name="price"
                          id="price"
                          placeholder="Enter product price"
                          {...register('price')}
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="category">
                        Category
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        // name="category"
                        id="category"
                        placeholder="Enter product category"
                        {...register('category')}
                      />
                      {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="quantity">
                      Quantity
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="number"
                    //   name="quantity"
                      id="quantity"
                      placeholder="Quantity"
                      {...register('quantity')}
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="description">
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        // name="description"
                        id="description"
                        rows={6}
                        placeholder="Enter product description"
                        {...register('description')}
                      ></textarea>
                      {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
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

export default CreateProduct;

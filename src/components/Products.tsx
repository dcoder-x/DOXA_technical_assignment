"use client"
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setIsLoading } from '@/lib/slices/loadStateSlice';
import { productType } from '@/types/product';
import Link from 'next/link';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ProductFilter from '@/components/utils/Filter';
import Sort from '@/components/utils/Sort';
import EmptyPageLottie from '@/components/Lottie/Empty';
import Loader from './common/Loader';
import productSlice, { productActions } from '@/lib/slices/productSlice';
import { useGetProductsQuery } from '@/lib/services/productQuery';

const Products:React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
//   const [productData, setproductData] = useState<[] | undefined>();
  const [sort, setSort] = useState('asc');
  const [sortedAndFilteredData, setSortedAndFilteredData] = useState<productType[]>([]);

  const dispatch = useAppDispatch()

  const setLoaderState = (state:boolean) => dispatch(setIsLoading(state))

  const setCurrentProduct = (product:productType)=>dispatch(productActions.setProduct(product))

  const {data:productData,isLoading} = useGetProductsQuery()


  useEffect(() => {
    const filteredData =
      productData?.filter(
        (product: { name: string }) =>
          product?.name?.toLowerCase()?.includes(filter.toLowerCase()),
        // Assuming `product` has `name`, 
      ) || [];

    const sortedData = [...filteredData].sort(
      (a: { name: string }, b: { name: string }) => {
        if (sort === 'asc') {
          return Number(new Date(a.name)) - Number(new Date(b.name));
        } else {
          return Number(new Date(b.name)) - Number(new Date(a.name));
        }
      },
    );

    setSortedAndFilteredData(sortedData);
  }, [productData, filter, sort]);


function handleView(product:productType) {
  setCurrentProduct(product)
}

  // Adjusted for pagination logic to use sortedAndFilteredData
  const dataLength = sortedAndFilteredData.length;
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedAndFilteredData.slice(startIndex, endIndex);

  const totalPageCount = Math.ceil(dataLength / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  };

  // function to dynamically render products
  function renderproductData() {
    if (currentItems != undefined) {
      if (currentItems.length > 0) {
        return (
          <tbody>
            {currentItems?.map((product: productType, i: number) => (
              <tr
                key={i}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    {/* <img src={} alt="" /> */}
                    {product.name} 
                  </div>
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.description}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ${product.price}
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.quantity}
                </td>

                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.units_available||"-"}
                </td>
                <Link href={'view'} onClick={e=>{handleView(product)}}>
                  <td className="px-4 flex bg-blue-500 items-center justify-center rounded-md mx-2 hover:bg-blue-600 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <p className="mx-2">View</p>
                    <Icon icon={'uil:eye'} />
                  </td>
                </Link>
              </tr>
            ))}
          </tbody>
        );
      }
    } else {
      return (
        <div className=" w-full h-max p-2 shadow-md rounded-md flex items-center justify-center flex-col">
          Request failed
        </div>
      );
    }
  }

  //main return function
  return (
    <>
        <DefaultLayout>
      <Breadcrumb pageName="products" />
      <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
        <div className="px-4 mx-auto w-full">
          <div className="relative overflow-hidden bg-blue-950 shadow-md dark:bg-gray-800 sm:rounded-lg">
            <Link
              href={'create'}
              className="text-white py-2 px-2 w-fit flex items-center  bg-purple-900 rounded-sm"
            >
              {/* <AddCircleOutlineOutlinedIcon color='white'/> */}
              Add a product <Icon className="m-2" icon={'uil-plus-circle'} />
            </Link>{' '}
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              {/* ... (existing code) */}
              <ProductFilter filter={filter} setFilter={setFilter} />
              <Sort sort={sort} setSort={setSort} />
            </div>
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All products:</span>
                  <span className="dark:text-white">{productData?.length}</span>
                </h5>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3">
                     Unit available
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {renderproductData()}
              </table>
              {currentItems && currentItems?.length < 1 && <EmptyPageLottie />}
            </div>
            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing page
                <span className="font-semibold mx-2 text-gray-900 dark:text-white">
                  {currentPage}
                </span>
                of
                <span className="font-semibold mx-2 text-gray-900 dark:text-white">
                  {totalPages}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 ${
                      currentPage === 1
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                    disabled={currentPage === 1}
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="">Previous</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 ${
                      currentPage === totalPageCount
                        ? 'cursor-not-allowed'
                        : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                    disabled={currentPage === totalPageCount}
                  >
                    <span className="">Next</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </DefaultLayout>
    {
        isLoading &&     <Loader/>
    }

    </>

  );
};

export default Products;

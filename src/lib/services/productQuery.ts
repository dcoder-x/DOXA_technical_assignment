// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { productType } from '@/types/product'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



type ProductsResponse = productType[]

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inventory.free.beeceptor.com/api/inventory' }),
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, void>({
      query: () => 'Products',
      // Provides a list of `Products` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Products` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Products', id } as const)),
              { type: 'Products', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Products', id: 'LIST' }` is invalidated
            [{ type: 'Products', id: 'LIST' }],
    }),
    addProduct: build.mutation<productType, Partial<productType>>({
      query(body) {
        return {
          url: `/`,
          method: 'POST',
          body,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: build.query<productType, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    updateProduct: build.mutation<productType, Partial<productType>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/${id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getProduct` will be re-run. `getProducts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),
    deleteProduct: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsAPI
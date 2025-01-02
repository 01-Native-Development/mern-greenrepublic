import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getBaseURL} from '../../../utils/baseURLUtils.js';


const productAPI = createApi({
   reducerPath: 'productAPI',
   baseQuery: fetchBaseQuery({
      baseUrl: `${getBaseURL()}/api/v1.0/products`,
      credentials: 'include'
   }),
   tagTypes: ['Product'],
   endpoints: (builder) => ({
      getAllProducts: builder.query({
         query: ({
                    category,
                    color,
                    minPrice,
                    maxPrice,
                    page = 1,
                    limit = 10
                 }) => {
            const queryParams = new URLSearchParams({
               category: category || '',
               color: color || '',
               minPrice: minPrice || 0,
               maxPrice: maxPrice || '',
               page: page.toString(),
               limit: limit.toString()
            }).toString();

            return `/?${queryParams}`;
         },
         providesTags: ['Product']
      }),
      getSingleProduct: builder.query({
         query: (id) => `/${id}`,
         providesTags: (result, error, id) => [{type: 'Product', id}]
      }),
      createProduct: builder.mutation({
         query: (newProduct) => ({
            url: '/create-product',
            method: 'POST',
            body: newProduct,
            credentials: 'include'
         }),
         invalidatesTags: ['Product']
      }),
      getRelatedProducts: builder.query({
         query: (id) => `/related-products/${id}`
      }),
      updateProduct: builder.mutation({
         query: ({id, ...rest}) => ({
            url: `update-product/${id}`,
            method: 'PATCH',
            body: rest,
            credentials: 'include'
         }),
         invalidatesTags: ['Product']
      }),

      deleteProduct: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
            credentials: 'include'
         }),
         invalidatesTags: (result, error, id) => [{type: 'Product', id}]
      })
   })
});

export const {
   useGetAllProductsQuery,
   useGetSingleProductQuery,
   useCreateProductMutation,
   useGetRelatedProductsQuery,
   useUpdateProductMutation,
   useDeleteProductMutation
} = productAPI;

export default productAPI;
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import rtkAxiosBaseQuery from '../../core/services/api/rtkAxiosBaseQuery'

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: rtkAxiosBaseQuery(),
    tagTypes: [
        'User',
    ],
    endpoints: () => ({
      
    }),
})

export const { middleware, reducer, reducerPath } = apiSlice

export default apiSlice;

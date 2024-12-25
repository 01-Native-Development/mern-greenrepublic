import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {getBaseURL} from '../../../utils/baseURLUtils.js';


const userAPI = createApi({
   reducerPath: 'userAPI',
   baseQuery: fetchBaseQuery({
      baseUrl: `${getBaseURL()}/api/v1.0/users`,
      credentials: 'include',
   }),
   tagTypes: ["User"],
   endpoints: (builder) => ({
      signUpUser: builder.mutation({
         query: (newUser) => ({
            url: '/sign-up',
            method: 'POST',
            body: newUser
         })
      }),
      signInUser: builder.mutation({
         query: (credentials) => ({
            url: '/sign-in',
            method: 'POST',
            body: credentials
         })
      }),
      signOutUser: builder.mutation({
         query: () => ({
            url: '/sign-out',
            method: 'POST'
         })
      }),
      getAllUsers: builder.query({
         query: () => ({
            url: '/get-all-users',
            method: 'GET',
         }),
         refetchOnMount: true,
         invalidatesTags: ['User']
      }),
      deleteUser:  builder.mutation({
         query: (userId) => ({
            url: `/delete-user/${userId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ["User"],
      }),
      updateUserRole: builder.mutation({
         query: ({userId, role}) => ({
            url: `/update-user-role/${userId}`,
            method: "PUT",
            body: {role}
         }),
         refetchOnMount: true,
         invalidatesTags: ["User"],
      }),
      updateUserProfile:  builder.mutation({
         query: (userData) => ({
            url: `/update-user-profile`,
            method: "PATCH",
            body: userData
         })
      })
   })
});

export const {
   useSignInUserMutation, useSignOutUserMutation, useSignUpUserMutation,
   useGetAllUsersMutation, useDeleteUserMutation, useUpdateUserRoleMutation,
   useUpdateUserProfileMutation
} = userAPI;
export default userAPI;
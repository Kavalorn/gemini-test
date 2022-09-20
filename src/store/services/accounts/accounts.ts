import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddAccountReqDto, AddAccountResDto, GetAllAccountsResDto, SwitchAccountReqDto, UpdateAccountReqDto, UpdateAccountResDto } from './types'

export const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['accounts'],
  endpoints: (builder) => ({

    getAllAccounts: builder.query<GetAllAccountsResDto, string>({
      query: () => ({
        url: `/accounts`,
        method: "GET",
      }),  
      providesTags: ['accounts']
    }),

    addAccount: builder.mutation<AddAccountResDto, AddAccountReqDto>({
      query: (account) => ({
        url: `/accounts`,
        method: "POST",
        body: account
      }),
      invalidatesTags: ['accounts'],
    }),

    updateAccount: builder.mutation<UpdateAccountResDto, UpdateAccountReqDto>({
      query: (updatedAccount) => ({
        url: `/accounts`,
        method: "PUT",
        body: updatedAccount,
      }),
      invalidatesTags: ['accounts'],
    }),

    switchAccount: builder.mutation<string, SwitchAccountReqDto>({
      query: (updatedAccount) => ({
        url: `/accounts/switch`,
        method: "PUT",
        body: updatedAccount,
      }),
      invalidatesTags: ['accounts'],
    }),

    deleteAccount: builder.mutation<undefined, {accountId: string}>({
      query: ({accountId}) => ({
        url: `/accounts/${accountId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['accounts'],
    }),
  }),
  
})


export const { 
  useGetAllAccountsQuery,
  useAddAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountsApi
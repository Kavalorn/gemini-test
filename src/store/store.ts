import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { accountsApi } from './services/accounts/accounts';
import { proxiesApi } from './services/proxies/proxies';

export const store = configureStore({
  reducer: {
    accounts: accountsApi.reducer,
    proxies: proxiesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(accountsApi.middleware, proxiesApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
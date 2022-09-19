import axios from 'axios';
import { AddAccountReqDto, AddAccountResDto, GetAllAccountsResDto, GetProxiesResDto, SwitchAccountReqDto, UpdateAccountReqDto, UpdateAccountResDto } from './types';

export const api = {
    accounts: {
        getAll: () => axios.get<GetAllAccountsResDto>('/accounts'),
        add: () => axios.post<AddAccountReqDto, AddAccountResDto>('/accounts'),
        update: () => axios.put<UpdateAccountReqDto, UpdateAccountResDto>('/accounts'),
        delete: (accountId: string) => axios.delete<undefined, string>(`/accounts/${accountId}`),
        switch: () => axios.put<SwitchAccountReqDto, string>('accounts/switch'),
    },
    proxies: {
        getAll: () => axios.get<GetProxiesResDto>('/proxies/simple'),
    }
}
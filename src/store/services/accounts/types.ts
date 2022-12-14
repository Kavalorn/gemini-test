export interface GetAllAccountsResDto extends Array<Account & {disabled: boolean}> {}

export interface AddAccountReqDto extends Account {}
export interface AddAccountResDto extends Account {
    disabled: boolean
}
export interface UpdateAccountReqDto extends Account {}
export interface UpdateAccountResDto extends Account {
    disabled: boolean
}

export interface SwitchAccountReqDto {
    disable: boolean,
    username: string
}

export interface GetProxiesResDto extends Array<SimpleProxy> {}

export interface SimpleProxy {
    label: string
}

export interface Account {
    _id: string
    password: string
    proxies: string[]
    cookies: ICookies
    userAgent: string
    username: string
}

export interface AccountWithDsiabled extends Account {
    disabled: boolean
}
  
export interface ICookies {
    [key: string]: Cookie[]
}

export interface Cookie {
    name: string
    value: string
    path?: string
    expires?: string
    secure?: boolean
    httpOnly?: boolean
}

export interface GenericErrorResDto {
    message: string
}

export function isErrorWithMessage(
    error: unknown
  ): error is { data: {message: string}} {
    return (
      typeof error === 'object' &&
      error != null &&
      'data' in error &&
      'message' in (error as any).data &&
      typeof (error as any).data.message === 'string'
    )
  }
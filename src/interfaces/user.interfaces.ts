

export interface UserData {
  usedCompanyCount: number;
  companyLimit: number;
}

export interface UserState {
  isAuthorized: boolean;
  isLoggingIn: boolean;
  isLoading: boolean;
  isFirstLoad: boolean;
  userInfo: UserData;
  loginServerError: string;
}

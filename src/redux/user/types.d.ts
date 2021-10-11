type User = undefined | UserData;

interface UserStatus {
  refresh: () => void;
  login: (data: UserLoginData) => void;
  getProfile: () => void;
  user: User;
  isLoading: boolean;
  error: HttpError;
}

interface UserLoginData {
  username: string;
  password: string;
}

type UserAction = {
  type: string;
  data?: object;
  error?: string;
};

type UserState = {
  user?: UserData;
  fiscalData?: UserFiscalData;
  loading: boolean;
  loadingProfile: boolean;
  error?: string;
};
type UserDispatchType = (args: UserAction) => UserAction;

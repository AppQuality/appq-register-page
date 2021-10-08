import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { refreshUser, loginUser, getProfile } from "./actionCreators";

export default (): UserStatus => {
  const {
    user,
    loading,
    error,
  }: { user: UserData; loading: boolean; error?: string } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
      error: state.user.error,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    refresh: () => dispatch(refreshUser()),
    login: (data: UserLoginData) => dispatch(loginUser(data)),
    getProfile: () => dispatch(getProfile()),
    user: user,
    isLoading: loading,
    error: error,
  };
};

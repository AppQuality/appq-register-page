import API from "../../../utils/api";
import * as actionTypes from "../actionTypes";

export function refreshUser(additionalFields?: string) {
  let query = "name,surname,image,onboarding_completed,email,wp_user_id";
  if (additionalFields) {
    query += `,${additionalFields}`;
  }
  return async (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.USER_LOAD });
    try {
      const user = await API.me(undefined, query);
      dispatch({
        type: actionTypes.USER_REFRESH,
        data: user,
      });
    } catch (e) {
      dispatch({ type: actionTypes.USER_FAILED, error: e });
    }
  };
}

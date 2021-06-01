import HttpError from "../utils/HttpError";

export interface UserData {
  id: number;
  wp_user_id: number;
  role: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  image: string;
  verified?: boolean;
}

export type User = undefined | UserData;

export interface UserStatus {
  user: User;
  isLoading: boolean;
  error: HttpError;
}

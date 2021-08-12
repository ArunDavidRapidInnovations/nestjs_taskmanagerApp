export interface SigninResponse {
  accessToken: string;
  userData: {
    id: string;
    username: string;
  };
}

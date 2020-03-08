export interface AuthResponseModel {
    success: boolean;
    msj: string;
    data: {
      token: string,
      userId: string,
      username: string,
      role: string,
      expireTime: string
    };
  }

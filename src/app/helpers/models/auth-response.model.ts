export interface AuthResponseModel {
    success: boolean;
    msj: string;
    data: {
      token: string,
      userdId: string,
      username: string,
      role: string,
      expireTime: string
    };
  }

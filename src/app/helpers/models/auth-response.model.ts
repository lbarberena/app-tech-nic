export interface AuthResponseModel {
    success: boolean;
    msj: string;
    data: {
      token: string,
      userId: string,
      username: string,
      name: string;
      role: string,
      authenticationNumber: number;
      fingerPrintToken: string;
    };
  }

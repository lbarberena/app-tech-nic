export interface BillsModel {
    _id: string;
    code: string;
    userId: string;
    username: string;
    clientName: string;
    products: object;
    taxes: number;
    subTotal: number;
    total: number;
    Date: string;
    month: number;
  }

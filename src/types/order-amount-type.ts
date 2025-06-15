// user
interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  imageURL?: string;
  role: string;
  status: string;
  reviews?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  orderProducts: any[];
  amount: number;
  discountedAmount: number;
  orderNote: string;
  deliveryDistrict: any;
  city: string;
  street: string;
  building: string;
  floor: string;
  paymentMethod: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderAmounts {
  todayOrderAmount: number;
  yesterdayOrderAmount: number;
  monthlyOrderAmount: number;
  totalOrderAmount: number;
  todayCardPaymentAmount: number;
  todayCashPaymentAmount: number;
  yesterDayCardPaymentAmount: number;
  yesterDayCashPaymentAmount: number;
}

export interface ISalesEntry {
  date: string;
  total: number;
  order: number;
}

export interface ISalesReport {
  salesReport: ISalesEntry[];
}

export interface IMostSellingCategory {
  categoryData: {
    _id: string;
    count: number;
  }[];
}

// I Dashboard Recent Orders
export interface IOrder {
  _id: string;
  user: string;
  name: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  invoice: number;
}

export interface IDashboardRecentOrders {
  orders: IOrder[];
  totalOrder: number;
}

// get all orders type
export interface IGetAllOrdersRes {
  success: boolean;
  data: Order[];
}
export interface IGetsingleOrderRes {
  success: boolean;
  data: any;
}
// get all orders type
export interface IUpdateStatusOrderRes {
  success: boolean;
  message: string;
}

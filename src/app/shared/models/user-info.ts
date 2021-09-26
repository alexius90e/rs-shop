import { UserOrder } from "./user-order";

export interface UserInfo {
  firstName: string;
  lastName: string;
  cart: string[];
  favorites: string[];
  orders: UserOrder[];
}

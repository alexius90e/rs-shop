import { UserOrder } from "./user-order";

export interface UserInfo {
  firstName: string;
  lastName: string;
  catr: string[];
  favorites: string[];
  orders: UserOrder[];
}

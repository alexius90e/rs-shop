import { OrderItem } from './order-item';

export interface UserOrderRequest {
  items: OrderItem[];
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
}

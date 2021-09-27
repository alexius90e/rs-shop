import { OrderItem } from './order-item';

export interface UserOrder {
  items: OrderItem[];
  details: {
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    comment: string;
  };
  id: string;
}

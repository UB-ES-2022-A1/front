import { Order } from './Order';

export interface FiltersTO {
  search: string;
  priceMax?: number;
  priceMin?: number;
  priceOrd: Order;
}

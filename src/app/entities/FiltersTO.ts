import { Order } from './Order';

export interface FiltersTO {
  priceMax?: number;
  priceMin?: number;
  priceOrd: Order;
}

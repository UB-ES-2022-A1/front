import { ServiceTO } from './ServiceTO';

export interface ContractTO {
  serviceId: number;
  status: string;
  user: string;
  service?: ServiceTO;
  price: number;
  seller: string;
  title: string;
  description: string;
}

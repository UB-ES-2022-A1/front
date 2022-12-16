import { ServiceTO } from './ServiceTO';

export interface ContractTO {
  serviceId: number;
  status: number;
  user: string;
  service?: ServiceTO;
  price: number;
  seller: string;
  title: string;
  description: string;
  contract_id: number;
}

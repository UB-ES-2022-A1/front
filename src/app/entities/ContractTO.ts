import { ServiceTO } from './ServiceTO';

export interface ContractTO {
  validate_c: number;
  validate_s: number;
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

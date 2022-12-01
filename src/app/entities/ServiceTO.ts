import { UserTO } from './UserTO';

export interface ServiceTO {
  id: number;
  title: string;
  description: string;
  price: number;
  requiresPlace?: boolean;
  user?: UserTO;
}

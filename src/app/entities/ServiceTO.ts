export interface ServiceTO{
  id: number; 
  title: string;
  description: string; 
  price: number
  requiresPlace?: boolean
  user?: string; 
}
export interface ProductionStatus {
  id: number;
  total: number;
  notCompleted: number;
  inProduction: number;
  completed: number;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  percentageChange: number;
}

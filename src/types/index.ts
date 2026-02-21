export type UserRole = 'fleet_manager' | 'dispatcher' | 'safety_officer' | 'financial_analyst';

export interface User {
  id: string;
  password: string;
  name: string;
  role: UserRole;
  roleLabel: string;
}

export interface Vehicle {
  id: number;
  plate: string;
  model: string;
  type: string;
  capacity: number;
  odometer: number;
  status: 'active' | 'maintenance' | 'inactive';
  maxPayload: number;
  initialOdometer: number;
}

export interface Trip {
  id: number;
  vehicle: string;
  vehiclePlate: string;
  fleetType: string;
  driver: string;
  origin: string;
  destination: string;
  status: 'in_transit' | 'delivered' | 'pending' | 'cancelled';
  cargoWeight: number;
  estimatedFuelCost: number;
}

export interface MaintenanceLog {
  id: string;
  vehiclePlate: string;
  vehicle: string;
  issue: string;
  date: string;
  cost: number;
  status: 'completed' | 'in_progress' | 'pending';
}

export interface Expense {
  tripId: number;
  driver: string;
  distance: number;
  fuelExpense: number;
  miscExpense: number;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Driver {
  id: number;
  name: string;
  license: string;
  expiry: string;
  completionRate: number;
  safetyScore: number;
  complaints: string[];
}

export interface MonthlySummary {
  month: string;
  revenue: number;
  fuelCost: number;
  maintenance: number;
  netProfit: number;
}

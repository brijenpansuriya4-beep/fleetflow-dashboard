import { User, Vehicle, Trip, MaintenanceLog, Expense, Driver, MonthlySummary } from '@/types';

export const USERS: User[] = [
  { id: 'manager007', password: 'manager@123', name: 'James Carter', role: 'fleet_manager', roleLabel: 'Fleet Manager' },
  { id: 'dispatcher007', password: 'dispatcher@123', name: 'Sarah Mitchell', role: 'dispatcher', roleLabel: 'Dispatcher' },
  { id: 'safetyofficer007', password: 'safetyofficer@123', name: 'Robert Chen', role: 'safety_officer', roleLabel: 'Safety Officer' },
  { id: 'financialanalyst007', password: 'financialanalyst@123', name: 'Emily Watson', role: 'financial_analyst', roleLabel: 'Financial Analyst' },
];

export const VEHICLES: Vehicle[] = [
  { id: 1, plate: 'FL-1024', model: 'Volvo FH16', type: 'Heavy Truck', capacity: 25000, odometer: 124500, status: 'active', maxPayload: 25000, initialOdometer: 100000 },
  { id: 2, plate: 'FL-2048', model: 'Mercedes Actros', type: 'Heavy Truck', capacity: 22000, odometer: 98200, status: 'active', maxPayload: 22000, initialOdometer: 80000 },
  { id: 3, plate: 'FL-3072', model: 'Scania R500', type: 'Trailer', capacity: 30000, odometer: 156800, status: 'maintenance', maxPayload: 30000, initialOdometer: 120000 },
  { id: 4, plate: 'FL-4096', model: 'MAN TGX', type: 'Heavy Truck', capacity: 24000, odometer: 67300, status: 'active', maxPayload: 24000, initialOdometer: 50000 },
  { id: 5, plate: 'FL-5120', model: 'DAF XF', type: 'Light Truck', capacity: 12000, odometer: 45600, status: 'active', maxPayload: 12000, initialOdometer: 30000 },
  { id: 6, plate: 'FL-6144', model: 'Isuzu NPR', type: 'Light Truck', capacity: 8000, odometer: 34200, status: 'inactive', maxPayload: 8000, initialOdometer: 20000 },
  { id: 7, plate: 'FL-7168', model: 'Kenworth T680', type: 'Heavy Truck', capacity: 28000, odometer: 210400, status: 'active', maxPayload: 28000, initialOdometer: 180000 },
  { id: 8, plate: 'FL-8192', model: 'Peterbilt 579', type: 'Trailer', capacity: 32000, odometer: 178900, status: 'active', maxPayload: 32000, initialOdometer: 150000 },
];

export const TRIPS: Trip[] = [
  { id: 1001, vehicle: 'Volvo FH16', vehiclePlate: 'FL-1024', fleetType: 'Heavy Truck', driver: 'Mike Johnson', origin: 'New York', destination: 'Chicago', status: 'in_transit', cargoWeight: 18000, estimatedFuelCost: 850 },
  { id: 1002, vehicle: 'Mercedes Actros', vehiclePlate: 'FL-2048', fleetType: 'Heavy Truck', driver: 'Tom Williams', origin: 'Los Angeles', destination: 'Phoenix', status: 'delivered', cargoWeight: 15000, estimatedFuelCost: 620 },
  { id: 1003, vehicle: 'MAN TGX', vehiclePlate: 'FL-4096', fleetType: 'Heavy Truck', driver: 'David Brown', origin: 'Houston', destination: 'Dallas', status: 'pending', cargoWeight: 20000, estimatedFuelCost: 340 },
  { id: 1004, vehicle: 'DAF XF', vehiclePlate: 'FL-5120', fleetType: 'Light Truck', driver: 'Chris Davis', origin: 'Miami', destination: 'Orlando', status: 'in_transit', cargoWeight: 8500, estimatedFuelCost: 280 },
  { id: 1005, vehicle: 'Kenworth T680', vehiclePlate: 'FL-7168', fleetType: 'Heavy Truck', driver: 'Alex Wilson', origin: 'Seattle', destination: 'Portland', status: 'delivered', cargoWeight: 22000, estimatedFuelCost: 410 },
  { id: 1006, vehicle: 'Peterbilt 579', vehiclePlate: 'FL-8192', fleetType: 'Trailer', driver: 'Ryan Taylor', origin: 'Denver', destination: 'Salt Lake City', status: 'cancelled', cargoWeight: 27000, estimatedFuelCost: 520 },
  { id: 1007, vehicle: 'Volvo FH16', vehiclePlate: 'FL-1024', fleetType: 'Heavy Truck', driver: 'Mike Johnson', origin: 'Boston', destination: 'Philadelphia', status: 'pending', cargoWeight: 16000, estimatedFuelCost: 390 },
];

export const MAINTENANCE_LOGS: MaintenanceLog[] = [
  { id: 'ML-001', vehiclePlate: 'FL-3072', vehicle: 'Scania R500', issue: 'Engine overheating', date: '2025-02-10', cost: 2400, status: 'in_progress' },
  { id: 'ML-002', vehiclePlate: 'FL-1024', vehicle: 'Volvo FH16', issue: 'Brake pad replacement', date: '2025-01-28', cost: 800, status: 'completed' },
  { id: 'ML-003', vehiclePlate: 'FL-6144', vehicle: 'Isuzu NPR', issue: 'Transmission failure', date: '2025-02-15', cost: 5200, status: 'pending' },
  { id: 'ML-004', vehiclePlate: 'FL-2048', vehicle: 'Mercedes Actros', issue: 'Oil leak repair', date: '2025-02-01', cost: 650, status: 'completed' },
  { id: 'ML-005', vehiclePlate: 'FL-7168', vehicle: 'Kenworth T680', issue: 'Tire rotation & replacement', date: '2025-02-18', cost: 1800, status: 'pending' },
];

export const EXPENSES: Expense[] = [
  { tripId: 1001, driver: 'Mike Johnson', distance: 1280, fuelExpense: 850, miscExpense: 120, status: 'approved' },
  { tripId: 1002, driver: 'Tom Williams', distance: 590, fuelExpense: 620, miscExpense: 85, status: 'approved' },
  { tripId: 1003, driver: 'David Brown', distance: 385, fuelExpense: 340, miscExpense: 45, status: 'pending' },
  { tripId: 1004, driver: 'Chris Davis', distance: 370, fuelExpense: 280, miscExpense: 60, status: 'approved' },
  { tripId: 1005, driver: 'Alex Wilson', distance: 280, fuelExpense: 410, miscExpense: 55, status: 'pending' },
  { tripId: 1006, driver: 'Ryan Taylor', distance: 840, fuelExpense: 520, miscExpense: 90, status: 'rejected' },
];

export const DRIVERS: Driver[] = [
  { id: 1, name: 'Mike Johnson', license: 'CDL-A', expiry: '2026-08-15', completionRate: 96, safetyScore: 92, complaints: ['Late delivery on route NY-CHI on Jan 5', 'Exceeded speed limit near toll plaza'] },
  { id: 2, name: 'Tom Williams', license: 'CDL-A', expiry: '2025-11-20', completionRate: 89, safetyScore: 85, complaints: ['Damaged cargo packaging reported by client', 'Skipped mandatory rest stop'] },
  { id: 3, name: 'David Brown', license: 'CDL-B', expiry: '2026-03-10', completionRate: 94, safetyScore: 90, complaints: [] },
  { id: 4, name: 'Chris Davis', license: 'CDL-A', expiry: '2025-06-30', completionRate: 91, safetyScore: 78, complaints: ['Harsh braking incident reported', 'Failed to secure load properly', 'Verbal altercation at depot'] },
  { id: 5, name: 'Alex Wilson', license: 'CDL-A', expiry: '2026-12-01', completionRate: 98, safetyScore: 95, complaints: [] },
  { id: 6, name: 'Ryan Taylor', license: 'CDL-B', expiry: '2025-09-15', completionRate: 82, safetyScore: 72, complaints: ['Unauthorized route deviation', 'Late check-in at destination'] },
];

export const MONTHLY_SUMMARY: MonthlySummary[] = [
  { month: 'October', revenue: 48000, fuelCost: 12400, maintenance: 3200, netProfit: 32400 },
  { month: 'November', revenue: 52000, fuelCost: 13800, maintenance: 5100, netProfit: 33100 },
  { month: 'December', revenue: 45000, fuelCost: 11200, maintenance: 2800, netProfit: 31000 },
  { month: 'January', revenue: 55000, fuelCost: 14500, maintenance: 4600, netProfit: 35900 },
  { month: 'February', revenue: 51000, fuelCost: 13200, maintenance: 7800, netProfit: 30000 },
];

export const FUEL_EFFICIENCY_DATA = [
  { vehicle: 'FL-1024', efficiency: 3.2 },
  { vehicle: 'FL-2048', efficiency: 3.8 },
  { vehicle: 'FL-4096', efficiency: 3.5 },
  { vehicle: 'FL-5120', efficiency: 5.1 },
  { vehicle: 'FL-7168', efficiency: 2.9 },
  { vehicle: 'FL-8192', efficiency: 2.7 },
];

export const TOP_COSTLIEST_VEHICLES = [
  { vehicle: 'FL-3072', cost: 8200 },
  { vehicle: 'FL-7168', cost: 6400 },
  { vehicle: 'FL-6144', cost: 5850 },
  { vehicle: 'FL-1024', cost: 4300 },
  { vehicle: 'FL-2048', cost: 3900 },
];

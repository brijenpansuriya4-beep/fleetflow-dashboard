import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { StatusBadge } from '@/components/StatusBadge';
import { TRIPS, VEHICLES, DRIVERS } from '@/data/mockData';
import { Trip } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const Trips = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>(TRIPS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ vehicle: '', driver: '', origin: '', destination: '', cargoWeight: '', fuelCost: '' });

  const canCreate = user?.role === 'fleet_manager' || user?.role === 'dispatcher';
  const cargoWarning = Number(form.cargoWeight) > 0 && Number(form.cargoWeight) < 500;

  const handleCreate = () => {
    if (!form.vehicle || !form.driver || !form.origin || !form.destination) {
      toast.error('Please fill all required fields');
      return;
    }
    const selectedVehicle = VEHICLES.find(v => v.plate === form.vehicle);
    const newTrip: Trip = {
      id: Math.max(...trips.map(t => t.id)) + 1,
      vehicle: selectedVehicle?.model || '',
      vehiclePlate: form.vehicle,
      fleetType: selectedVehicle?.type || '',
      driver: form.driver,
      origin: form.origin,
      destination: form.destination,
      status: 'pending',
      cargoWeight: Number(form.cargoWeight),
      estimatedFuelCost: Number(form.fuelCost),
    };
    setTrips(prev => [...prev, newTrip]);
    toast.success('Trip dispatched successfully');
    setForm({ vehicle: '', driver: '', origin: '', destination: '', cargoWeight: '', fuelCost: '' });
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trip Dispatcher</h1>
            <p className="text-muted-foreground">Create and manage fleet trips</p>
          </div>
          {canCreate && <Button onClick={() => setShowForm(true)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" />New Trip</Button>}
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">No</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fleet Type</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Vehicle</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Driver</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Origin</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Destination</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((t, i) => (
                    <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-foreground">{i + 1}</td>
                      <td className="py-3 px-4 text-foreground">{t.fleetType}</td>
                      <td className="py-3 px-4 font-medium text-foreground">{t.vehiclePlate}</td>
                      <td className="py-3 px-4 text-foreground">{t.driver}</td>
                      <td className="py-3 px-4 text-muted-foreground">{t.origin}</td>
                      <td className="py-3 px-4 text-muted-foreground">{t.destination}</td>
                      <td className="py-3 px-4"><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create New Trip</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Select Vehicle</Label>
                  <Select value={form.vehicle} onValueChange={v => setForm({...form, vehicle: v})}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Choose vehicle" /></SelectTrigger>
                    <SelectContent>{VEHICLES.filter(v => v.status === 'active').map(v => <SelectItem key={v.plate} value={v.plate}>{v.plate} - {v.model}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Driver</Label>
                  <Select value={form.driver} onValueChange={v => setForm({...form, driver: v})}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Choose driver" /></SelectTrigger>
                    <SelectContent>{DRIVERS.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Origin</Label><Input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} className="mt-1" placeholder="City" /></div>
                <div><Label>Destination</Label><Input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} className="mt-1" placeholder="City" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cargo Weight (kg)</Label>
                  <Input type="number" value={form.cargoWeight} onChange={e => setForm({...form, cargoWeight: e.target.value})} className="mt-1" />
                  {cargoWarning && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-warning text-xs">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Cargo weight is below 500 kg — confirm if correct</span>
                    </div>
                  )}
                </div>
                <div><Label>Estimated Fuel Cost ($)</Label><Input type="number" value={form.fuelCost} onChange={e => setForm({...form, fuelCost: e.target.value})} className="mt-1" /></div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="gradient-primary text-primary-foreground">Confirm & Dispatch</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Trips;

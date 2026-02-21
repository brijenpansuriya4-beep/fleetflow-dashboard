import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { StatusBadge } from '@/components/StatusBadge';
import { VEHICLES } from '@/data/mockData';
import { Vehicle } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Vehicles = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState({ plate: '', model: '', type: 'Heavy Truck', capacity: '', odometer: '', maxPayload: '' });

  const canEdit = user?.role === 'fleet_manager';
  const canDelete = user?.role === 'fleet_manager';
  const canAdd = user?.role === 'fleet_manager';

  const resetForm = () => {
    setForm({ plate: '', model: '', type: 'Heavy Truck', capacity: '', odometer: '', maxPayload: '' });
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.plate || !form.model) { toast.error('Please fill all required fields'); return; }
    if (editing) {
      setVehicles(prev => prev.map(v => v.id === editing.id ? {
        ...v, plate: form.plate, model: form.model, type: form.type,
        capacity: Number(form.capacity), odometer: Number(form.odometer), maxPayload: Number(form.maxPayload),
      } : v));
      toast.success('Vehicle updated');
    } else {
      const newV: Vehicle = {
        id: Math.max(...vehicles.map(v => v.id)) + 1, plate: form.plate, model: form.model, type: form.type,
        capacity: Number(form.capacity), odometer: Number(form.odometer), maxPayload: Number(form.maxPayload),
        initialOdometer: Number(form.odometer), status: 'active',
      };
      setVehicles(prev => [...prev, newV]);
      toast.success('Vehicle added');
    }
    resetForm();
  };

  const handleEdit = (v: Vehicle) => {
    setForm({ plate: v.plate, model: v.model, type: v.type, capacity: String(v.capacity), odometer: String(v.odometer), maxPayload: String(v.maxPayload) });
    setEditing(v);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    toast.success('Vehicle deleted');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vehicle Registry</h1>
            <p className="text-muted-foreground">Manage your fleet vehicles</p>
          </div>
          {canAdd && <Button onClick={() => setShowForm(true)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" />New Vehicle</Button>}
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">No</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Plate</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Model</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Capacity (kg)</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Odometer</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                    {(canEdit || canDelete) && <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <tr key={v.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-foreground">{i + 1}</td>
                      <td className="py-3 px-4 font-medium text-foreground">{v.plate}</td>
                      <td className="py-3 px-4 text-foreground">{v.model}</td>
                      <td className="py-3 px-4 text-muted-foreground">{v.type}</td>
                      <td className="py-3 px-4 text-foreground">{v.capacity.toLocaleString()}</td>
                      <td className="py-3 px-4 text-foreground">{v.odometer.toLocaleString()} km</td>
                      <td className="py-3 px-4"><StatusBadge status={v.status} /></td>
                      {(canEdit || canDelete) && (
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            {canEdit && <Button variant="ghost" size="sm" onClick={() => handleEdit(v)}><Pencil className="h-4 w-4" /></Button>}
                            {canDelete && <Button variant="ghost" size="sm" onClick={() => handleDelete(v.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showForm} onOpenChange={() => resetForm()}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>License Plate</Label><Input value={form.plate} onChange={e => setForm({...form, plate: e.target.value})} className="mt-1" /></div>
                <div><Label>Model</Label><Input value={form.model} onChange={e => setForm({...form, model: e.target.value})} className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Heavy Truck">Heavy Truck</SelectItem><SelectItem value="Light Truck">Light Truck</SelectItem><SelectItem value="Trailer">Trailer</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Max Payload (kg)</Label><Input type="number" value={form.maxPayload} onChange={e => setForm({...form, maxPayload: e.target.value, capacity: e.target.value})} className="mt-1" /></div>
              </div>
              <div><Label>Initial Odometer (km)</Label><Input type="number" value={form.odometer} onChange={e => setForm({...form, odometer: e.target.value})} className="mt-1" /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} className="gradient-primary text-primary-foreground">{editing ? 'Update' : 'Add Vehicle'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Vehicles;

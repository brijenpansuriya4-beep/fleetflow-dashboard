import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { StatusBadge } from '@/components/StatusBadge';
import { TRIPS, VEHICLES, DRIVERS } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Truck, Wrench, Package, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [groupBy, setGroupBy] = useState('none');
  const [sortBy, setSortBy] = useState('id');
  const [filterStatus, setFilterStatus] = useState('all');

  const activeFleet = VEHICLES.filter(v => v.status === 'active').length;
  const maintenanceAlert = VEHICLES.filter(v => v.status === 'maintenance').length;
  const pendingCargo = TRIPS.filter(t => t.status === 'pending').length;

  const canCreateTrip = user?.role === 'fleet_manager' || user?.role === 'dispatcher';
  const canCreateVehicle = user?.role === 'fleet_manager';

  let trips = [...TRIPS];
  if (search) trips = trips.filter(t => Object.values(t).some(v => String(v).toLowerCase().includes(search.toLowerCase())));
  if (filterStatus !== 'all') trips = trips.filter(t => t.status === filterStatus);
  if (sortBy === 'id') trips.sort((a, b) => a.id - b.id);
  if (sortBy === 'driver') trips.sort((a, b) => a.driver.localeCompare(b.driver));
  if (sortBy === 'status') trips.sort((a, b) => a.status.localeCompare(b.status));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-2">
            {canCreateTrip && <Button onClick={() => navigate('/trips')} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-1" />New Trip</Button>}
            {canCreateVehicle && <Button variant="outline" onClick={() => navigate('/vehicles')}><Plus className="h-4 w-4 mr-1" />New Vehicle</Button>}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center"><Truck className="h-6 w-6 text-success" /></div>
              <div><p className="text-2xl font-bold text-foreground">{activeFleet}</p><p className="text-sm text-muted-foreground">Active Fleet</p></div>
            </CardContent>
          </Card>
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center"><Wrench className="h-6 w-6 text-warning" /></div>
              <div><p className="text-2xl font-bold text-foreground">{maintenanceAlert}</p><p className="text-sm text-muted-foreground">Maintenance Alert</p></div>
            </CardContent>
          </Card>
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center"><Package className="h-6 w-6 text-info" /></div>
              <div><p className="text-2xl font-bold text-foreground">{pendingCargo}</p><p className="text-sm text-muted-foreground">Pending Cargo</p></div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search trips..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]"><Filter className="h-4 w-4 mr-1" /><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Trip ID</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Group By" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Grouping</SelectItem>
                  <SelectItem value="status">By Status</SelectItem>
                  <SelectItem value="driver">By Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Trip Table */}
        <Card className="shadow-card">
          <CardHeader className="pb-3"><CardTitle className="text-lg">Recent Trips</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Trip</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Vehicle</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Driver</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Route</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map(trip => (
                    <tr key={trip.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">#{trip.id}</td>
                      <td className="py-3 px-4 text-foreground">{trip.vehiclePlate}</td>
                      <td className="py-3 px-4 text-foreground">{trip.driver}</td>
                      <td className="py-3 px-4 text-muted-foreground">{trip.origin} → {trip.destination}</td>
                      <td className="py-3 px-4"><StatusBadge status={trip.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

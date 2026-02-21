import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EXPENSES, FUEL_EFFICIENCY_DATA, TOP_COSTLIEST_VEHICLES, MONTHLY_SUMMARY } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, TrendingUp, Gauge } from 'lucide-react';

const Analytics = () => {
  const totalFuelCost = EXPENSES.reduce((s, e) => s + e.fuelExpense, 0);
  const totalRevenue = MONTHLY_SUMMARY.reduce((s, m) => s + m.revenue, 0);
  const totalCosts = MONTHLY_SUMMARY.reduce((s, m) => s + m.fuelCost + m.maintenance, 0);
  const roi = ((totalRevenue - totalCosts) / totalCosts * 100).toFixed(1);
  const utilization = 75;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Financial Reports</h1>
          <p className="text-muted-foreground">Fleet performance and financial overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center"><DollarSign className="h-6 w-6 text-destructive" /></div>
              <div><p className="text-2xl font-bold text-foreground">${totalFuelCost.toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Fuel Cost</p></div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center"><TrendingUp className="h-6 w-6 text-success" /></div>
              <div><p className="text-2xl font-bold text-foreground">{roi}%</p><p className="text-sm text-muted-foreground">Fleet ROI</p></div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center"><Gauge className="h-6 w-6 text-info" /></div>
              <div><p className="text-2xl font-bold text-foreground">{utilization}%</p><p className="text-sm text-muted-foreground">Utilization Rate</p></div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Fuel Efficiency (km/L)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={FUEL_EFFICIENCY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                  <XAxis dataKey="vehicle" tick={{ fontSize: 12 }} stroke="hsl(215 15% 47%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 15% 47%)" />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214 20% 88%)', fontSize: '13px' }} />
                  <Bar dataKey="efficiency" fill="hsl(217 71% 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Top 5 Costliest Vehicles</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={TOP_COSTLIEST_VEHICLES} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(215 15% 47%)" />
                  <YAxis dataKey="vehicle" type="category" tick={{ fontSize: 12 }} stroke="hsl(215 15% 47%)" width={60} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214 20% 88%)', fontSize: '13px' }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Cost']} />
                  <Bar dataKey="cost" fill="hsl(0 72% 51%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Summary */}
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg">Monthly Financial Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Month</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Revenue</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fuel Cost</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Maintenance</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Net Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {MONTHLY_SUMMARY.map(m => (
                    <tr key={m.month} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{m.month}</td>
                      <td className="py-3 px-4 text-success font-medium">${m.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-destructive">${m.fuelCost.toLocaleString()}</td>
                      <td className="py-3 px-4 text-warning">${m.maintenance.toLocaleString()}</td>
                      <td className="py-3 px-4 text-foreground font-bold">${m.netProfit.toLocaleString()}</td>
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

export default Analytics;

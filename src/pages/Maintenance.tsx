import { Layout } from '@/components/Layout';
import { StatusBadge } from '@/components/StatusBadge';
import { MAINTENANCE_LOGS } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Maintenance = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Maintenance & Service Logs</h1>
          <p className="text-muted-foreground">Track vehicle maintenance and service records</p>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Log ID</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Vehicle</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Issue</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Cost</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MAINTENANCE_LOGS.map(log => (
                    <tr key={log.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{log.id}</td>
                      <td className="py-3 px-4 text-foreground">{log.vehiclePlate} — {log.vehicle}</td>
                      <td className="py-3 px-4 text-foreground">{log.issue}</td>
                      <td className="py-3 px-4 text-muted-foreground">{log.date}</td>
                      <td className="py-3 px-4 text-foreground">${log.cost.toLocaleString()}</td>
                      <td className="py-3 px-4"><StatusBadge status={log.status} /></td>
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

export default Maintenance;

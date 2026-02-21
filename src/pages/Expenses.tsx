import { Layout } from '@/components/Layout';
import { StatusBadge } from '@/components/StatusBadge';
import { EXPENSES } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';

const Expenses = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expense & Fuel Logging</h1>
          <p className="text-muted-foreground">Track trip expenses and fuel consumption</p>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Trip ID</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Driver</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Distance (km)</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Fuel Expense</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Misc Expense</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {EXPENSES.map(exp => (
                    <tr key={exp.tripId} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">#{exp.tripId}</td>
                      <td className="py-3 px-4 text-foreground">{exp.driver}</td>
                      <td className="py-3 px-4 text-foreground">{exp.distance.toLocaleString()}</td>
                      <td className="py-3 px-4 text-foreground">${exp.fuelExpense.toLocaleString()}</td>
                      <td className="py-3 px-4 text-foreground">${exp.miscExpense.toLocaleString()}</td>
                      <td className="py-3 px-4"><StatusBadge status={exp.status} /></td>
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

export default Expenses;

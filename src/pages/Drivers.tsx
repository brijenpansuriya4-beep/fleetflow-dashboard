import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { DRIVERS } from '@/data/mockData';
import { Driver } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Drivers = () => {
  const { user } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [complaintsModal, setComplaintsModal] = useState<Driver | null>(null);
  const [editScore, setEditScore] = useState<{ id: number; score: string } | null>(null);

  const canUpdateScore = user?.role === 'safety_officer' || user?.role === 'fleet_manager';

  const handleUpdateScore = () => {
    if (!editScore) return;
    const score = Number(editScore.score);
    if (score < 0 || score > 100) { toast.error('Score must be between 0-100'); return; }
    setDrivers(prev => prev.map(d => d.id === editScore.id ? { ...d, safetyScore: score } : d));
    toast.success('Safety score updated');
    setEditScore(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Driver Performance & Safety</h1>
          <p className="text-muted-foreground">Monitor driver metrics and safety compliance</p>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">License</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Expiry</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Completion Rate</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Safety Score</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Complaints</th>
                    {canUpdateScore && <th className="text-left py-3 px-4 text-muted-foreground font-medium">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {drivers.map(d => (
                    <tr key={d.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{d.name}</td>
                      <td className="py-3 px-4 text-foreground">{d.license}</td>
                      <td className="py-3 px-4 text-muted-foreground">{d.expiry}</td>
                      <td className="py-3 px-4 text-foreground">{d.completionRate}%</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${d.safetyScore >= 90 ? 'text-success' : d.safetyScore >= 75 ? 'text-warning' : 'text-destructive'}`}>
                          {d.safetyScore}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button onClick={() => d.complaints.length > 0 && setComplaintsModal(d)} className={`font-medium ${d.complaints.length > 0 ? 'text-primary underline cursor-pointer hover:opacity-80' : 'text-muted-foreground'}`}>
                          {d.complaints.length}
                        </button>
                      </td>
                      {canUpdateScore && (
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" onClick={() => setEditScore({ id: d.id, score: String(d.safetyScore) })}>
                            Update Score
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Modal */}
        <Dialog open={!!complaintsModal} onOpenChange={() => setComplaintsModal(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Complaints — {complaintsModal?.name}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              {complaintsModal?.complaints.map((c, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium text-muted-foreground min-w-[24px]">{i + 1}.</span>
                  <p className="text-sm text-foreground">{c}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Score Modal */}
        <Dialog open={!!editScore} onOpenChange={() => setEditScore(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Update Safety Score</DialogTitle></DialogHeader>
            <div>
              <Input type="number" min="0" max="100" value={editScore?.score || ''} onChange={e => editScore && setEditScore({ ...editScore, score: e.target.value })} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditScore(null)}>Cancel</Button>
              <Button onClick={handleUpdateScore} className="gradient-primary text-primary-foreground">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Drivers;

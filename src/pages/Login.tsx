import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Truck, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const err = login(userId, password);
      if (err) {
        setError(err);
        setLoading(false);
      } else {
        navigate('/dashboard');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="h-20 w-20 rounded-2xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center mx-auto mb-8">
            <Truck className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">FleetFlow</h1>
          <p className="text-primary-foreground/80 text-lg">Enterprise Fleet Management System</p>
          <div className="mt-12 grid grid-cols-3 gap-4 text-primary-foreground/70 text-sm">
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary-foreground">150+</div>
              <div>Vehicles</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary-foreground">98%</div>
              <div>Uptime</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary-foreground">24/7</div>
              <div>Tracking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">FleetFlow</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="userId" className="text-sm font-medium text-foreground">User ID</Label>
              <Input id="userId" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter your User ID" className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
              <div className="relative mt-1.5">
                <Input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div><span className="font-medium text-foreground">Manager:</span> manager007</div>
              <div><span className="font-medium text-foreground">Pass:</span> manager@123</div>
              <div><span className="font-medium text-foreground">Dispatcher:</span> dispatcher007</div>
              <div><span className="font-medium text-foreground">Pass:</span> dispatcher@123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

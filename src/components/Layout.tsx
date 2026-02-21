import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Truck, MapPin, Wrench, DollarSign, Users, BarChart3, LogOut, ChevronLeft, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['fleet_manager', 'dispatcher', 'safety_officer', 'financial_analyst'] },
  { label: 'Vehicle Registry', path: '/vehicles', icon: <Truck className="h-5 w-5" />, roles: ['fleet_manager', 'dispatcher', 'safety_officer'] },
  { label: 'Trip Dispatcher', path: '/trips', icon: <MapPin className="h-5 w-5" />, roles: ['fleet_manager', 'dispatcher'] },
  { label: 'Maintenance Logs', path: '/maintenance', icon: <Wrench className="h-5 w-5" />, roles: ['fleet_manager', 'dispatcher', 'safety_officer'] },
  { label: 'Expense & Fuel', path: '/expenses', icon: <DollarSign className="h-5 w-5" />, roles: ['fleet_manager', 'financial_analyst'] },
  { label: 'Driver Performance', path: '/drivers', icon: <Users className="h-5 w-5" />, roles: ['fleet_manager', 'dispatcher', 'safety_officer'] },
  { label: 'Analytics', path: '/analytics', icon: <BarChart3 className="h-5 w-5" />, roles: ['fleet_manager', 'financial_analyst'] },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filteredNav = navItems.filter(item => user && item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'gradient-sidebar flex flex-col transition-all duration-300 border-r border-sidebar-border',
        collapsed ? 'w-16' : 'w-64'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Truck className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sidebar-accent-foreground font-bold text-lg">FleetFlow</span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-sidebar-foreground hover:text-sidebar-accent-foreground p-1 rounded-md hover:bg-sidebar-accent transition-colors">
            {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {filteredNav.map(item => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-sidebar-border p-3">
          {!collapsed && user && (
            <div className="mb-2 px-1">
              <p className="text-sm font-medium text-sidebar-accent-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground">{user.roleLabel}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 lg:p-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

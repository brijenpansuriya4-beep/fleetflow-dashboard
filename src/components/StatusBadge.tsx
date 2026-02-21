import { cn } from '@/lib/utils';

type BadgeVariant = 'active' | 'maintenance' | 'inactive' | 'in_transit' | 'delivered' | 'pending' | 'cancelled' | 'completed' | 'in_progress' | 'approved' | 'rejected';

const variantStyles: Record<BadgeVariant, string> = {
  active: 'bg-success/15 text-success',
  completed: 'bg-success/15 text-success',
  delivered: 'bg-success/15 text-success',
  approved: 'bg-success/15 text-success',
  in_transit: 'bg-info/15 text-info',
  in_progress: 'bg-info/15 text-info',
  pending: 'bg-warning/15 text-warning',
  maintenance: 'bg-warning/15 text-warning',
  inactive: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/15 text-destructive',
  rejected: 'bg-destructive/15 text-destructive',
};

const labels: Record<BadgeVariant, string> = {
  active: 'Active',
  completed: 'Completed',
  delivered: 'Delivered',
  approved: 'Approved',
  in_transit: 'In Transit',
  in_progress: 'In Progress',
  pending: 'Pending',
  maintenance: 'Maintenance',
  inactive: 'Inactive',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
};

export const StatusBadge = ({ status, className }: { status: string; className?: string }) => {
  const variant = status as BadgeVariant;
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variantStyles[variant] || 'bg-muted text-muted-foreground', className)}>
      {labels[variant] || status}
    </span>
  );
};

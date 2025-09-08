import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BarChart3,
  DoorOpen,
  Users,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const revenueData = [
  { month: "Jan", value: 120000 },
  { month: "Feb", value: 128000 },
  { month: "Mar", value: 131000 },
  { month: "Apr", value: 139000 },
  { month: "May", value: 144500 },
  { month: "Jun", value: 152000 },
];

export default function AdminDashboard() {
  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of occupancy, tenants, and maintenance. Payments not
            configured yet.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/admin/rooms">Manage Rooms</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="#">Open Reports</a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={DoorOpen} label="Total Rooms" value="8" />
        <KPI icon={Users} label="Active Tenants" value="6" />
        <KPI icon={BarChart3} label="Occupancy" value="75%" />
        <KPI icon={AlertTriangle} label="Open Requests" value="3" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        <div className="rounded-xl border bg-card p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold mb-2">Monthly Income (Preview)</h3>
          <p className="text-xs text-muted-foreground mb-4">
            For preview only; payments module will be added later.
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revAdmin" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="url(#revAdmin)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-3">Active Maintenance</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wrench className="h-4 w-4" /> Room A-101 – Leaky faucet
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs border bg-amber-500/10 text-amber-700 dark:text-amber-300">
                In Progress
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wrench className="h-4 w-4" /> Room B-201 – AC not cooling
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs border">
                Pending
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wrench className="h-4 w-4" /> Common Area – Bulb replacement
              </span>
              <span className="px-2 py-0.5 rounded-md text-xs border bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                Completed
              </span>
            </li>
          </ul>
          <div className="mt-4">
            <Button variant="outline" size="sm" asChild>
              <a href="#">View All Requests</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="font-semibold mb-2">Quick Links</h3>
        <div className="flex flex-wrap gap-2">
          <QuickLink to="/admin/rooms" label="Rooms" />
          <QuickLink to="#" label="Tenants" />
          <QuickLink to="#" label="Leases/Deposits" />
          <QuickLink to="#" label="Maintenance" />
          <QuickLink to="#" label="Bookings" />
          <QuickLink to="#" label="Reports" />
          <QuickLink to="#" label="Settings" />
        </div>
      </div>
    </div>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-lg font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}

function QuickLink({ to, label }: { to: string; label: string }) {
  return (
    <Button variant="outline" asChild>
      <Link to={to}>{label}</Link>
    </Button>
  );
}

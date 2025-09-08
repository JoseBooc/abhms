import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  CalendarClock,
  FileText,
  Wrench,
  CreditCard,
  ShieldCheck,
  DoorOpen,
  BarChart3,
  Search,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const revenueData = [
  { month: "Jan", value: 120000 },
  { month: "Feb", value: 128000 },
  { month: "Mar", value: 131000 },
  { month: "Apr", value: 139000 },
  { month: "May", value: 144500 },
  { month: "Jun", value: 152000 },
];

const occupancyData = [
  { label: "Avail", value: 18 },
  { label: "Occ", value: 72 },
  { label: "Maint", value: 10 },
];

export default function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-4 bg-background/60">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Multi-user RBAC • Billing • Maintenance • Reports
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Areja Boarding House Management System
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              A complete platform to manage rooms, tenants, leases, billing,
              reservations, and maintenance—built for admins, staff, and
              tenants.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#modules">Explore Modules</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#booking">View Available Rooms</a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={Building2} label="Total Rooms" value="100" />
              <StatCard icon={Users} label="Active Tenants" value="72" />
              <StatCard icon={DoorOpen} label="Occupancy" value="72%" />
              <StatCard
                icon={CreditCard}
                label="Monthly Revenue"
                value="₱152k"
              />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-gradient-to-br from-primary/15 via-accent/60 to-transparent rounded-3xl blur-2xl" />
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> Revenue (6 mo)
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
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
                      fill="url(#rev)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <DoorOpen className="h-4 w-4" /> Occupancy
                </h3>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={occupancyData}>
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="hsl(var(--muted))"
                      />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        fontSize={12}
                      />
                      <YAxis hide />
                      <Bar
                        dataKey="value"
                        radius={[6, 6, 0, 0]}
                        fill="hsl(var(--accent-foreground))"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Feature
            icon={ShieldCheck}
            title="Role-Based Access"
            desc="Admin, Tenant, and Staff portals with granular permissions."
          />
          <Feature
            icon={CreditCard}
            title="Billing & Payments"
            desc="Auto-generate invoices, track paid/overdue, record payments."
          />
          <Feature
            icon={Wrench}
            title="Maintenance"
            desc="Tenants submit requests; admins assign, staff update status."
          />
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="container py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          User Roles
        </h2>
        <p className="text-muted-foreground mt-2">
          Three dedicated experiences built for productivity.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <RoleCard
            title="Admin"
            points={[
              "Full-system control",
              "Manage rooms, tenants, leases",
              "Assign maintenance to staff",
              "View analytics & reports",
            ]}
          />
          <RoleCard
            title="Tenant"
            points={[
              "View lease & payment history",
              "Pay monthly invoices",
              "Submit and track maintenance",
              "Booking requests (optional)",
            ]}
          />
          <RoleCard
            title="Staff"
            points={[
              "See assigned tasks",
              "Update request statuses",
              "Focus on work orders",
              "Mobile-friendly portal",
            ]}
          />
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="container py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Core Modules
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ModuleCard
            icon={BarChart3}
            title="Admin Dashboard"
            desc="KPIs for rooms, tenants, maintenance, and revenue at a glance."
          />
          <ModuleCard
            icon={DoorOpen}
            title="Room Management"
            desc="Manage room number, type, rate, capacity, and status."
          />
          <ModuleCard
            icon={Users}
            title="Tenant Management"
            desc="Profiles with contacts, photo, leases and payments."
          />
          <ModuleCard
            icon={CalendarClock}
            title="Lease Management"
            desc="Contracts with dates, rent, deposit and room assignment."
          />
          <ModuleCard
            icon={CreditCard}
            title="Billing & Payments"
            desc="Auto invoices, paid/unpaid/overdue tracking, payment logs."
          />
          <ModuleCard
            icon={Search}
            title="Bookings (Optional)"
            desc="Public page to browse available rooms and request reservations."
          />
          <ModuleCard
            icon={Wrench}
            title="Maintenance Requests"
            desc="Submit, assign to staff, track status to completion."
          />
          <ModuleCard
            icon={FileText}
            title="Reports & Analytics"
            desc="Occupancy, financial summaries, and turnover insights."
          />
          <ModuleCard
            icon={ShieldCheck}
            title="System & Users"
            desc="Manage users, roles, settings, branding, and controls."
          />
        </div>
      </section>

      {/* ANALYTICS */}
      <section id="analytics" className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-xl border p-6 bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Monthly Revenue</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track earnings and forecast growth.
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#rev2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border p-6 bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Occupancy Mix</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor available vs occupied vs maintenance.
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="hsl(var(--muted))"
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis hide />
                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    fill="hsl(var(--accent-foreground))"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKINGS */}
      <section id="booking" className="container py-16 md:py-24">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-accent/20 to-background p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Available Rooms
              </h3>
              <p className="text-muted-foreground mt-1">
                Browse open rooms and send a reservation request.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <a href="#">Submit Reservation</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#">Contact Admin</a>
              </Button>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <RoomCard
              number="A-101"
              type="Single"
              rate="₱4,500"
              status="Available"
            />
            <RoomCard
              number="A-102"
              type="Double"
              rate="₱7,000"
              status="Available"
            />
            <RoomCard
              number="B-201"
              type="Single"
              rate="₱4,800"
              status="Available"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
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

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground grid place-items-center mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
}

function RoleCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" /> {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ModuleCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-md bg-primary/10 text-primary grid place-items-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function RoomCard({
  number,
  type,
  rate,
  status,
}: {
  number: string;
  type: string;
  rate: string;
  status: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Room</div>
          <div className="text-lg font-semibold">{number}</div>
          <div className="text-sm">
            {type} • {rate}/mo
          </div>
        </div>
        <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          {status}
        </span>
      </div>
    </div>
  );
}

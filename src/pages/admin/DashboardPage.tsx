import { useDashboardStats, useRecentBookings } from "../../hooks/useDashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import {
  CalendarDays,
  Wrench,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

const statCards = [
  {
    key: "totalBookings",
    label: "Total Bookings",
    icon: ClipboardList,
    color: "text-blue-500",
  },
  {
    key: "todaysBookings",
    label: "Today's Bookings",
    icon: CalendarDays,
    color: "text-green-500",
  },
  {
    key: "upcomingBookings",
    label: "Upcoming Bookings",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    key: "cancelledBookings",
    label: "Cancelled Bookings",
    icon: AlertCircle,
    color: "text-red-500",
  },
  {
    key: "totalActiveServices",
    label: "Active Services",
    icon: Wrench,
    color: "text-purple-500",
  },
];

const statusBadgeVariant = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "success" as const;
    case "Pending":
      return "default" as const;
    case "Cancelled":
      return "destructive" as const;
    case "Completed":
      return "secondary" as const;
    default:
      return "default" as const;
  }
};

export const DashboardPage = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentBookings, isLoading: bookingsLoading } =
    useRecentBookings(10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-[var(--color-muted-foreground)]">
          Overview of your shop's performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const value = stats?.[stat.key as keyof typeof stats] ?? 0;

          return (
            <Card key={stat.key}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? (
                    <div className="h-8 w-16 animate-pulse rounded bg-[var(--color-muted)]" />
                  ) : (
                    value
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[var(--color-muted-foreground)]" />
            <CardTitle>Recent Bookings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {bookingsLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 animate-pulse rounded bg-[var(--color-muted)]"
                />
              ))}
            </div>
          ) : !recentBookings || recentBookings.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-[var(--color-muted-foreground)]">
              No bookings yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.customerName}
                    </TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {booking.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full bg-[var(--color-muted)] px-2 py-0.5 text-xs font-medium"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadgeVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

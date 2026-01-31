import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { TrendingUp, Activity, Users, Zap } from "lucide-react";

export default function AnalyticsPage() {
    const stats = [
        {
            label: "Avg. Booking Time",
            value: "2.4 min",
            change: "+0.5 min",
            icon: Activity,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            label: "Success Rate",
            value: "94.2%",
            change: "+2.1%",
            icon: TrendingUp,
            color: "text-green-400",
            bgColor: "bg-green-400/10",
        },
        {
            label: "Total Patients",
            value: "12,543",
            change: "+1,234",
            icon: Users,
            color: "text-blue-400",
            bgColor: "bg-blue-400/10",
        },
        {
            label: "This Month",
            value: "8,234",
            change: "+34%",
            icon: Zap,
            color: "text-yellow-400",
            bgColor: "bg-yellow-400/10",
        },
    ];

    const bookingTrends = [
        { date: "Mon", bookings: 120 },
        { date: "Tue", bookings: 150 },
        { date: "Wed", bookings: 145 },
        { date: "Thu", bookings: 180 },
        { date: "Fri", bookings: 220 },
        { date: "Sat", bookings: 190 },
        { date: "Sun", bookings: 160 },
    ];

    const appointmentTypes = [
        { name: "Cardiology", value: 30, color: "#3b82f6" },
        { name: "Orthopedics", value: 25, color: "#10b981" },
        { name: "Neurology", value: 20, color: "#f59e0b" },
        { name: "Pediatrics", value: 25, color: "#ec4899" },
    ];

    const hospitalData = [
        { name: "City General", patients: 450 },
        { name: "St. Mary", patients: 380 },
        { name: "Metro Health", patients: 320 },
        { name: "University", patients: 280 },
    ];

    const peakHours = [
        { hour: "8 AM", calls: 45 },
        { hour: "10 AM", calls: 85 },
        { hour: "12 PM", calls: 120 },
        { hour: "2 PM", calls: 110 },
        { hour: "4 PM", calls: 95 },
        { hour: "6 PM", calls: 65 },
    ];

    return (
        <div className="min-h-screen bg-background p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Analytics Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Monitor key metrics and system performance
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-card rounded-xl p-6 border border-border shadow-lg"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                            >
                                <stat.icon
                                    className={`w-6 h-6 ${stat.color}`}
                                />
                            </div>
                            <p className="text-sm text-green-400">
                                {stat.change}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Booking Trends */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Booking Trends
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={bookingTrends}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#334155"
                            />
                            <XAxis dataKey="date" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                }}
                                labelStyle={{ color: "#e2e8f0" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="bookings"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ fill: "#3b82f6", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Appointment Types */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Appointment Types
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={appointmentTypes}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {appointmentTypes.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                }}
                                labelStyle={{ color: "#e2e8f0" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Hospitals */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Top Hospitals
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={hospitalData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#334155"
                            />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                }}
                                labelStyle={{ color: "#e2e8f0" }}
                            />
                            <Bar
                                dataKey="patients"
                                fill="#10b981"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Peak Call Hours */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                        Peak Call Hours
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={peakHours}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#334155"
                            />
                            <XAxis dataKey="hour" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1e293b",
                                    border: "1px solid #475569",
                                }}
                                labelStyle={{ color: "#e2e8f0" }}
                            />
                            <Bar
                                dataKey="calls"
                                fill="#f59e0b"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

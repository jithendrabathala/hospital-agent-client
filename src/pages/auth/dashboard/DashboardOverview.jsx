import {
    Calendar,
    Phone,
    CheckCircle,
    Clock,
    TrendingUp,
    Users,
    Activity,
} from "lucide-react";

export default function DashboardOverview() {
    const stats = [
        {
            label: "Total Bookings Today",
            value: "47",
            change: "+12%",
            trend: "up",
            icon: Calendar,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            label: "Call Volume",
            value: "128",
            change: "+8%",
            trend: "up",
            icon: Phone,
            color: "text-blue-400",
            bgColor: "bg-blue-400/10",
        },
        {
            label: "Confirmed",
            value: "34",
            change: "+5%",
            trend: "up",
            icon: CheckCircle,
            color: "text-green-400",
            bgColor: "bg-green-400/10",
        },
        {
            label: "Pending",
            value: "13",
            change: "-3%",
            trend: "down",
            icon: Clock,
            color: "text-yellow-400",
            bgColor: "bg-yellow-400/10",
        },
    ];

    const upcomingAppointments = [
        {
            id: 1,
            patient: "Sarah Johnson",
            hospital: "City General Hospital",
            department: "Cardiology",
            time: "10:00 AM",
            status: "confirmed",
        },
        {
            id: 2,
            patient: "Michael Chen",
            hospital: "St. Mary Medical Center",
            department: "Orthopedics",
            time: "11:30 AM",
            status: "confirmed",
        },
        {
            id: 3,
            patient: "Emily Rodriguez",
            hospital: "Metro Health Clinic",
            department: "Pediatrics",
            time: "2:00 PM",
            status: "pending",
        },
        {
            id: 4,
            patient: "David Kim",
            hospital: "University Hospital",
            department: "Neurology",
            time: "3:15 PM",
            status: "confirmed",
        },
    ];

    const recentActivity = [
        {
            id: 1,
            action: "New booking confirmed",
            patient: "Sarah Johnson",
            time: "5 mins ago",
        },
        {
            id: 2,
            action: "Appointment rescheduled",
            patient: "Michael Chen",
            time: "12 mins ago",
        },
        {
            id: 3,
            action: "Booking cancelled",
            patient: "James Wilson",
            time: "25 mins ago",
        },
        {
            id: 4,
            action: "New booking request",
            patient: "Emily Rodriguez",
            time: "38 mins ago",
        },
    ];

    return (
        <div className="p-8 bg-background/50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's what's happening today.
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
                            <div
                                className={`flex items-center gap-1 text-sm ${
                                    stat.trend === "up"
                                        ? "text-green-400"
                                        : "text-red-400"
                                }`}
                            >
                                <TrendingUp
                                    className={`w-4 h-4 ${stat.trend === "down" ? "rotate-180" : ""}`}
                                />
                                <span>{stat.change}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-foreground mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-foreground">
                            Upcoming Appointments
                        </h2>
                        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">
                                            {appointment.patient}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {appointment.hospital}
                                        </p>
                                        <p className="text-xs text-primary mt-1">
                                            {appointment.department}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-foreground">
                                        {appointment.time}
                                    </p>
                                    <span
                                        className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                                            appointment.status === "confirmed"
                                                ? "bg-green-400/10 text-green-400"
                                                : "bg-yellow-400/10 text-yellow-400"
                                        }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">
                            Recent Activity
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="pb-4 border-b border-border last:border-0 last:pb-0"
                            >
                                <p className="text-sm font-medium text-foreground mb-1">
                                    {activity.action}
                                </p>
                                <p className="text-xs text-primary mb-1">
                                    {activity.patient}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.time}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

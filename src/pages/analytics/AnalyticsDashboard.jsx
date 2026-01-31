import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, TrendingUp, Users, Phone, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";

export default function AnalyticsDashboard() {
    const navigate = useNavigate();
    const [reservationTrends, setReservationTrends] = useState([]);
    const [callVolumeTrends, setCallVolumeTrends] = useState([]);
    const [statusBreakdown, setStatusBreakdown] = useState([]);
    const [kpis, setKpis] = useState({
        totalReservations: 0,
        totalCalls: 0,
        totalCustomers: 0,
        avgCallQuality: 0,
        successRate: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const hospitalProfile = localStorage.getItem("hospitalProfile");
    const hospitalInfo = hospitalProfile ? JSON.parse(hospitalProfile) : null;
    const hospitalName = hospitalInfo?.hospitalName || "Hospital";

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        setLoading(true);
        setError("");
        try {
            // Fetch reservations
            const resRes = await api.get("/api/reservations", {
                params: { dateFilter: "all" },
            });
            const reservations = resRes?.data?.data?.reservations || [];

            // Fetch call logs
            const callRes = await api.get("/api/call-logs", {
                params: { dateFilter: "all" },
            });
            const callLogs = callRes?.data?.data?.callLogs || [];

            // Fetch customers
            const custRes = await api.get("/api/customers");
            const customers = custRes?.data?.data?.customers || [];

            // Process reservation trends (by appointment date)
            const reservationByDate = {};
            reservations.forEach((res) => {
                const date = new Date(res.appointmentDate).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric",
                    },
                );
                reservationByDate[date] = (reservationByDate[date] || 0) + 1;
            });
            const resData = Object.entries(reservationByDate).map(
                ([date, count]) => ({
                    date,
                    count,
                }),
            );
            setReservationTrends(resData);

            // Process call volume trends (by call date)
            const callByDate = {};
            callLogs.forEach((call) => {
                const date = new Date(
                    call.callDate || call.createdAt,
                ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                });
                callByDate[date] = (callByDate[date] || 0) + 1;
            });
            const callData = Object.entries(callByDate).map(
                ([date, count]) => ({
                    date,
                    calls: count,
                }),
            );
            setCallVolumeTrends(callData);

            // Process status breakdown
            const statusCounts = {};
            reservations.forEach((res) => {
                const status = res.status || "Unknown";
                statusCounts[status] = (statusCounts[status] || 0) + 1;
            });
            const statusData = Object.entries(statusCounts).map(
                ([status, value]) => ({
                    name: status.charAt(0).toUpperCase() + status.slice(1),
                    value,
                }),
            );
            setStatusBreakdown(statusData);

            // Calculate KPIs
            const confirmedCount = reservations.filter(
                (r) => r.status === "confirmed",
            ).length;
            const avgQuality =
                callLogs.length > 0
                    ? (
                          callLogs.reduce(
                              (sum, call) => sum + (call.qualityScore || 0),
                              0,
                          ) / callLogs.length
                      ).toFixed(1)
                    : 0;
            const successRate =
                reservations.length > 0
                    ? ((confirmedCount / reservations.length) * 100).toFixed(1)
                    : 0;

            setKpis({
                totalReservations: reservations.length,
                totalCalls: callLogs.length,
                totalCustomers: customers.length,
                avgCallQuality: avgQuality,
                successRate: successRate,
            });
        } catch (err) {
            const message =
                err?.response?.data?.message || "Failed to load analytics";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("hospitalProfile");
        localStorage.removeItem("rememberLogin");
        navigate("/login");
    };

    const handleBackToDashboard = () => {
        navigate("/dashboard");
    };

    const COLORS = ["#e78a53", "#8b5cf6", "#f59e0b", "#10b981", "#3b82f6"];

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e78a53] mx-auto mb-4"></div>
                    <p className="text-zinc-300 font-medium">
                        Loading analytics...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-zinc-900/50 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            {hospitalName}
                        </h1>
                        <p className="text-zinc-400 text-sm mt-1">
                            Analytics & Trends Dashboard
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={handleBackToDashboard}
                            className="bg-[#e78a53] hover:bg-[#e78a53]/90 text-black font-semibold"
                        >
                            Back to Dashboard
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="border-zinc-700 text-white hover:bg-zinc-800 flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mx-6 mt-6">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* KPI Cards */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">
                                    Total Reservations
                                </p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {kpis.totalReservations}
                                </p>
                            </div>
                            <CheckCircle className="text-[#e78a53]" size={40} />
                        </div>
                    </Card>

                    <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">
                                    Total Calls
                                </p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {kpis.totalCalls}
                                </p>
                            </div>
                            <Phone className="text-[#e78a53]" size={40} />
                        </div>
                    </Card>

                    <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">
                                    Total Customers
                                </p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {kpis.totalCustomers}
                                </p>
                            </div>
                            <Users className="text-[#e78a53]" size={40} />
                        </div>
                    </Card>

                    <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">
                                    Avg Call Quality
                                </p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {kpis.avgCallQuality}
                                </p>
                                <p className="text-xs text-zinc-400 mt-1">
                                    out of 10
                                </p>
                            </div>
                            <TrendingUp className="text-[#e78a53]" size={40} />
                        </div>
                    </Card>

                    <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-[#e78a53]/50 transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-zinc-500 text-sm font-medium">
                                    Success Rate
                                </p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {kpis.successRate}%
                                </p>
                            </div>
                            <div className="text-[#e78a53] text-4xl font-bold">
                                ✓
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Reservation Trends */}
                    <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                        <h2 className="text-lg font-bold text-white mb-4">
                            Reservation Trends
                        </h2>
                        {reservationTrends.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={reservationTrends}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#3f3f46"
                                    />
                                    <XAxis dataKey="date" stroke="#a1a1aa" />
                                    <YAxis stroke="#a1a1aa" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#18181b",
                                            border: "1px solid #3f3f46",
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#e78a53"
                                        dot={{ fill: "#e78a53", r: 5 }}
                                        activeDot={{ r: 7 }}
                                        name="Reservations"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-zinc-400 text-center py-12">
                                No reservation data available
                            </p>
                        )}
                    </Card>

                    {/* Call Volume Trends */}
                    <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                        <h2 className="text-lg font-bold text-white mb-4">
                            Call Volume Trends
                        </h2>
                        {callVolumeTrends.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={callVolumeTrends}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#3f3f46"
                                    />
                                    <XAxis dataKey="date" stroke="#a1a1aa" />
                                    <YAxis stroke="#a1a1aa" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#18181b",
                                            border: "1px solid #3f3f46",
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="calls"
                                        fill="#e78a53"
                                        name="Calls"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-zinc-400 text-center py-12">
                                No call data available
                            </p>
                        )}
                    </Card>
                </div>

                {/* Status Breakdown */}
                <Card className="p-6 bg-zinc-900/50 border-zinc-800">
                    <h2 className="text-lg font-bold text-white mb-4">
                        Reservation Status Breakdown
                    </h2>
                    {statusBreakdown.length > 0 ? (
                        <div className="flex justify-center">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={statusBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) =>
                                            `${name}: ${value}`
                                        }
                                        outerRadius={100}
                                        fill="#e78a53"
                                        dataKey="value"
                                    >
                                        {statusBreakdown.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#18181b",
                                            border: "1px solid #3f3f46",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-zinc-400 text-center py-12">
                            No status data available
                        </p>
                    )}
                </Card>
            </div>
        </div>
    );
}

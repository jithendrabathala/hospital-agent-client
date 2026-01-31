import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar as CalendarIcon,
    TrendingUp,
    Users,
    Phone,
    CheckCircle,
} from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/lib/api";

const NAV_ITEMS = [
    "Dashboard",
    "Reservations",
    "Customers",
    "Call Logs",
    "Settings",
];
const FILTER_OPTIONS = [
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
    { value: "all", label: "All Time" },
    { value: "custom", label: "Custom Range" },
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("Reservations");
    const [reservations, setReservations] = useState([]);
    const [callLogs, setCallLogs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loadingSection, setLoadingSection] = useState("Reservations");
    const [errorSection, setErrorSection] = useState("");

    // Analytics state
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

    const [dateFilter, setDateFilter] = useState("today");
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");

    const hospitalProfile = localStorage.getItem("hospitalProfile");
    const hospitalInfo = hospitalProfile ? JSON.parse(hospitalProfile) : null;
    const hospitalName = hospitalInfo?.hospitalName || "Hospital";
    const hospitalId = hospitalInfo?.hospitalId;

    const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("hospitalProfile");
        localStorage.removeItem("rememberLogin");
        window.location.href = "/login";
    };

    const fetchReservations = async (
        filter = dateFilter,
        startDate = customStartDate,
        endDate = customEndDate,
    ) => {
        setLoadingSection("Reservations");
        setErrorSection("");

        try {
            const params = { dateFilter: filter };
            if (filter === "custom" && startDate && endDate) {
                params.startDate = startDate;
                params.endDate = endDate;
            }

            const response = await api.get("/api/reservations", { params });
            setReservations(response?.data?.data?.reservations || []);
        } catch (err) {
            const message =
                err?.response?.data?.message || "Unable to load reservations.";
            setErrorSection(message);
        } finally {
            setLoadingSection("");
        }
    };

    const fetchCallLogs = async (
        filter = dateFilter,
        startDate = customStartDate,
        endDate = customEndDate,
    ) => {
        setLoadingSection("Call Logs");
        setErrorSection("");

        try {
            const params = { dateFilter: filter };
            if (filter === "custom" && startDate && endDate) {
                params.startDate = startDate;
                params.endDate = endDate;
            }

            const response = await api.get("/api/call-logs", { params });
            setCallLogs(response?.data?.data?.callLogs || []);
        } catch (err) {
            const message =
                err?.response?.data?.message || "Unable to load call logs.";
            setErrorSection(message);
        } finally {
            setLoadingSection("");
        }
    };

    const fetchCustomers = async () => {
        setLoadingSection("Customers");
        setErrorSection("");

        try {
            const response = await api.get("/api/customers");
            setCustomers(response?.data?.data?.customers || []);
        } catch (err) {
            const message =
                err?.response?.data?.message || "Unable to load customers.";
            setErrorSection(message);
        } finally {
            setLoadingSection("");
        }
    };

    const fetchSettings = async () => {
        setLoadingSection("Settings");
        setErrorSection("");

        if (!hospitalId) {
            setErrorSection(
                "Hospital profile is missing. Please log in again.",
            );
            setLoadingSection("");
            return;
        }

        try {
            const response = await api.get(`/api/hospitals/${hospitalId}`);
            setSettings(response?.data?.data || null);
        } catch (err) {
            const message =
                err?.response?.data?.message || "Unable to load settings.";
            setErrorSection(message);
        } finally {
            setLoadingSection("");
        }
    };

    const fetchAnalytics = async () => {
        setLoadingSection("Dashboard");
        setErrorSection("");
        try {
            const resRes = await api.get("/api/reservations", {
                params: { dateFilter: "all" },
            });
            const reservations = resRes?.data?.data?.reservations || [];

            const callRes = await api.get("/api/call-logs", {
                params: { dateFilter: "all" },
            });
            const callLogs = callRes?.data?.data?.callLogs || [];

            const custRes = await api.get("/api/customers");
            const customers = custRes?.data?.data?.customers || [];

            // Process reservation trends
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

            // Process call volume trends
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
            setErrorSection(message);
        } finally {
            setLoadingSection("");
        }
    };

    const handleFilterChange = (newFilter) => {
        setDateFilter(newFilter);
        if (activeSection === "Reservations") {
            fetchReservations(newFilter, customStartDate, customEndDate);
        } else if (activeSection === "Call Logs") {
            fetchCallLogs(newFilter, customStartDate, customEndDate);
        }
    };

    const handleCustomDateApply = () => {
        if (customStartDate && customEndDate) {
            if (activeSection === "Reservations") {
                fetchReservations("custom", customStartDate, customEndDate);
            } else if (activeSection === "Call Logs") {
                fetchCallLogs("custom", customStartDate, customEndDate);
            }
        }
    };

    useEffect(() => {
        if (activeSection === "Reservations") {
            fetchReservations();
        } else if (activeSection === "Call Logs") {
            fetchCallLogs();
        } else if (activeSection === "Customers") {
            fetchCustomers();
        } else if (activeSection === "Settings") {
            fetchSettings();
        } else if (activeSection === "Dashboard") {
            fetchAnalytics();
        }
    }, [activeSection]);

    const reservationSummary = useMemo(() => {
        return {
            total: reservations.length,
            confirmed: reservations.filter(
                (item) => item.status === "confirmed",
            ).length,
            pending: reservations.filter((item) => item.status === "pending")
                .length,
        };
    }, [reservations]);

    const sectionTitle =
        activeSection === "Reservations" ? "Reservations" : activeSection;
    const sectionDescription =
        activeSection === "Dashboard"
            ? "View analytics and trends of your hospital operations."
            : activeSection === "Reservations"
              ? "View and manage appointment reservations."
              : activeSection === "Call Logs"
                ? "Review call activity and outcomes."
                : activeSection === "Customers"
                  ? "See patients who have booked with your hospital."
                  : "Update hospital settings and profile data.";

    const isLoading = loadingSection === activeSection;
    const hasError = errorSection && loadingSection === "";
    const showFilters =
        (activeSection === "Reservations" || activeSection === "Call Logs") &&
        activeSection !== "Dashboard";

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a1f3a] to-[#0a0f22] text-white">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <aside className="w-full border-b border-teal-500/20 bg-[#1a1f3a]/60 px-6 py-6 lg:w-72 lg:border-b-0 lg:border-r">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase text-teal-200/60">
                                Hospital
                            </p>
                            <h2 className="text-lg font-semibold text-white">
                                {hospitalName}
                            </h2>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="border-teal-500/30 text-white hover:bg-[#1a1f3a]"
                        >
                            Sign out
                        </Button>
                    </div>
                    <nav className="mt-8 space-y-2">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setActiveSection(item)}
                                className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition ${
                                    activeSection === item
                                        ? "bg-[#1dd1a1] text-black"
                                        : "text-teal-200/60 hover:bg-[#1a1f3a] hover:text-teal-100"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="flex-1 px-6 py-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {sectionTitle}
                            </h1>
                            <p className="text-sm text-zinc-400">
                                {sectionDescription}
                            </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    if (activeSection === "Reservations") {
                                        fetchReservations();
                                    } else if (activeSection === "Call Logs") {
                                        fetchCallLogs();
                                    } else if (activeSection === "Customers") {
                                        fetchCustomers();
                                    } else if (activeSection === "Dashboard") {
                                        fetchAnalytics();
                                    } else {
                                        fetchSettings();
                                    }
                                }}
                                className="border-teal-500/30 text-white hover:bg-[#1a1f3a]"
                            >
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {showFilters ? (
                        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-teal-500/20 bg-[#1a1f3a]/60 p-4">
                            <label className="text-sm font-medium text-white">
                                Filter:
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {FILTER_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            handleFilterChange(option.value)
                                        }
                                        className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                                            dateFilter === option.value
                                                ? "bg-[#1dd1a1] text-black"
                                                : "bg-[#1a1f3a] text-teal-200/60 hover:bg-[#253456] hover:text-teal-100"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>

                            {dateFilter === "custom" ? (
                                <div className="ml-auto flex flex-wrap items-center gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs border-teal-500/30 text-white hover:bg-[#1a1f3a]"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {customStartDate
                                                    ? new Date(
                                                          customStartDate,
                                                      ).toLocaleDateString()
                                                    : "Start date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0 bg-[#1a1f3a] border-teal-500/20"
                                            align="start"
                                        >
                                            <Calendar
                                                onDayClick={(date) => {
                                                    setCustomStartDate(
                                                        date
                                                            .toISOString()
                                                            .split("T")[0],
                                                    );
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <span className="text-xs text-teal-200/60">
                                        to
                                    </span>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs border-teal-500/30 text-white hover:bg-[#1a1f3a]"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {customEndDate
                                                    ? new Date(
                                                          customEndDate,
                                                      ).toLocaleDateString()
                                                    : "End date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0 bg-[#1a1f3a] border-teal-500/20"
                                            align="start"
                                        >
                                            <Calendar
                                                onDayClick={(date) => {
                                                    setCustomEndDate(
                                                        date
                                                            .toISOString()
                                                            .split("T")[0],
                                                    );
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleCustomDateApply}
                                        disabled={
                                            !customStartDate || !customEndDate
                                        }
                                        className="border-teal-500/30 text-white hover:bg-[#1a1f3a]"
                                    >
                                        Apply
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    ) : null}

                    {activeSection === "Reservations" ? (
                        <>
                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl border border-teal-500/20 bg-[#1a1f3a]/60 p-4">
                                    <p className="text-xs uppercase text-teal-200/60">
                                        Total
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-white">
                                        {reservationSummary.total}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-teal-500/20 bg-[#1a1f3a]/60 p-4">
                                    <p className="text-xs uppercase text-teal-200/60">
                                        Confirmed
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-emerald-500">
                                        {reservationSummary.confirmed}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-teal-500/20 bg-[#1a1f3a]/60 p-4">
                                    <p className="text-xs uppercase text-teal-200/60">
                                        Pending
                                    </p>
                                    <p className="mt-2 text-2xl font-semibold text-amber-500">
                                        {reservationSummary.pending}
                                    </p>
                                </div>
                            </div>

                            <section className="mt-8 rounded-xl border border-teal-500/20 bg-[#1a1f3a]/60">
                                <div className="border-b border-zinc-800 px-6 py-4">
                                    <h2 className="text-lg font-semibold text-white">
                                        Appointments
                                    </h2>
                                </div>
                                <div className="p-6">
                                    {isLoading ? (
                                        <p className="text-sm text-zinc-400">
                                            Loading reservations...
                                        </p>
                                    ) : hasError ? (
                                        <p className="rounded-md border border-red-800/50 bg-red-900/20 px-3 py-2 text-sm text-red-400">
                                            {errorSection}
                                        </p>
                                    ) : reservations.length === 0 ? (
                                        <p className="text-sm text-zinc-400">
                                            No reservations scheduled for today.
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {reservations.map((reservation) => {
                                                const customerName =
                                                    reservation.customerId
                                                        ?.name ||
                                                    "Unknown patient";
                                                const customerPhone =
                                                    reservation.customerId
                                                        ?.phone || "N/A";
                                                const reservationDate =
                                                    reservation.reservationDate
                                                        ? new Date(
                                                              reservation.reservationDate,
                                                          ).toLocaleDateString()
                                                        : "N/A";

                                                return (
                                                    <div
                                                        key={reservation._id}
                                                        className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-black/50 p-4 md:flex-row md:items-center md:justify-between"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-semibold text-white">
                                                                {customerName}
                                                            </p>
                                                            <p className="text-xs text-teal-200/60">
                                                                {customerPhone}
                                                            </p>
                                                            <p className="mt-1 text-xs text-teal-200/60">
                                                                {
                                                                    reservation.appointmentType
                                                                }{" "}
                                                                •{" "}
                                                                {
                                                                    reservationDate
                                                                }{" "}
                                                                •{" "}
                                                                {
                                                                    reservation.timeSlot
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-medium text-teal-200">
                                                                {
                                                                    reservation.status
                                                                }
                                                            </span>
                                                            {reservation.reason ? (
                                                                <span className="text-xs text-teal-200/60">
                                                                    {
                                                                        reservation.reason
                                                                    }
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </section>
                        </>
                    ) : null}

                    {activeSection === "Call Logs" ? (
                        <section className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50">
                            <div className="border-b border-zinc-800 px-6 py-4">
                                <h2 className="text-lg font-semibold text-white">
                                    Call Logs
                                </h2>
                            </div>
                            <div className="p-6">
                                {isLoading ? (
                                    <p className="text-sm text-teal-200/60">
                                        Loading call logs...
                                    </p>
                                ) : hasError ? (
                                    <p className="rounded-md border border-red-800/50 bg-red-900/20 px-3 py-2 text-sm text-red-400">
                                        {errorSection}
                                    </p>
                                ) : callLogs.length === 0 ? (
                                    <p className="text-sm text-teal-200/60">
                                        No calls logged today.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {callLogs.map((log) => {
                                            const customerName =
                                                log.customerId?.name ||
                                                "Unknown caller";
                                            const callTime = log.startTime
                                                ? new Date(
                                                      log.startTime,
                                                  ).toLocaleTimeString()
                                                : "N/A";
                                            const duration = log.duration
                                                ? `${Math.round(log.duration / 60)} min`
                                                : "N/A";

                                            return (
                                                <div
                                                    key={log._id}
                                                    className="flex flex-col gap-3 rounded-lg border border-teal-500/20 bg-[#0f172a]/50 p-4 md:flex-row md:items-center md:justify-between"
                                                >
                                                    <div>
                                                        <p className="text-sm font-semibold text-white">
                                                            {customerName}
                                                        </p>
                                                        <p className="text-xs text-teal-200/60">
                                                            {log.phoneNumber}
                                                        </p>
                                                        <p className="mt-1 text-xs text-teal-200/60">
                                                            {log.callType} •{" "}
                                                            {callTime} •{" "}
                                                            {duration}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-medium text-teal-200">
                                                            {log.callStatus}
                                                        </span>
                                                        {log.callOutcome ? (
                                                            <span className="text-xs text-teal-200/60">
                                                                {
                                                                    log.callOutcome
                                                                }
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : null}

                    {activeSection === "Customers" ? (
                        <section className="mt-8 rounded-xl border border-teal-500/20 bg-[#1a1f3a]/60">
                            <div className="border-b border-teal-500/20 px-6 py-4">
                                <h2 className="text-lg font-semibold text-white">
                                    Customers
                                </h2>
                            </div>
                            <div className="p-6">
                                {isLoading ? (
                                    <p className="text-sm text-teal-200/60">
                                        Loading customers...
                                    </p>
                                ) : hasError ? (
                                    <p className="rounded-md border border-red-800/50 bg-red-900/20 px-3 py-2 text-sm text-red-400">
                                        {errorSection}
                                    </p>
                                ) : customers.length === 0 ? (
                                    <p className="text-sm text-teal-200/60">
                                        No customers found yet.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {customers.map((customer) => {
                                            const lastReservation =
                                                customer.lastReservation
                                                    ? new Date(
                                                          customer.lastReservation,
                                                      ).toLocaleDateString()
                                                    : "N/A";

                                            return (
                                                <div
                                                    key={customer.customerId}
                                                    className="flex flex-col gap-3 rounded-lg border border-teal-500/20 bg-[#0f172a]/50 p-4 md:flex-row md:items-center md:justify-between"
                                                >
                                                    <div>
                                                        <p className="text-sm font-semibold text-white">
                                                            {customer.name}
                                                        </p>
                                                        <p className="text-xs text-teal-200/60">
                                                            {customer.phone}
                                                        </p>
                                                        <p className="mt-1 text-xs text-teal-200/60">
                                                            Last visit:{" "}
                                                            {lastReservation}
                                                        </p>
                                                    </div>
                                                    <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-medium text-teal-200">
                                                        {
                                                            customer.totalReservations
                                                        }{" "}
                                                        reservations
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </section>
                    ) : null}

                    {activeSection === "Dashboard" ? (
                        <section className="mt-8 space-y-8">
                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="text-xs font-medium text-teal-200/60">
                                                Total Reservations
                                            </p>
                                            <p className="mt-2 text-2xl font-semibold text-white">
                                                {kpis.totalReservations}
                                            </p>
                                        </div>
                                        <CheckCircle
                                            className="text-[#1dd1a1]"
                                            size={40}
                                        />
                                    </div>
                                </Card>

                                <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="text-xs font-medium text-teal-200/60">
                                                Total Calls
                                            </p>
                                            <p className="mt-2 text-2xl font-semibold text-white">
                                                {kpis.totalCalls}
                                            </p>
                                        </div>
                                        <Phone
                                            className="text-[#1dd1a1]"
                                            size={40}
                                        />
                                    </div>
                                </Card>

                                <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="text-xs font-medium text-teal-200/60">
                                                Total Customers
                                            </p>
                                            <p className="mt-2 text-2xl font-semibold text-white">
                                                {kpis.totalCustomers}
                                            </p>
                                        </div>
                                        <Users
                                            className="text-[#1dd1a1]"
                                            size={40}
                                        />
                                    </div>
                                </Card>

                                <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="text-xs font-medium text-teal-200/60">
                                                Avg Call Quality
                                            </p>
                                            <p className="mt-2 text-2xl font-semibold text-white">
                                                {kpis.avgCallQuality}
                                            </p>
                                            <p className="text-xs text-teal-200/60">
                                                out of 10
                                            </p>
                                        </div>
                                        <TrendingUp
                                            className="text-[#1dd1a1]"
                                            size={40}
                                        />
                                    </div>
                                </Card>

                                <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                    <div className="flex items-center justify-between p-4">
                                        <div>
                                            <p className="text-xs font-medium text-teal-200/60">
                                                Success Rate
                                            </p>
                                            <p className="mt-2 text-2xl font-semibold text-white">
                                                {kpis.successRate}%
                                            </p>
                                        </div>
                                        <CheckCircle
                                            className="text-[#1dd1a1]"
                                            size={40}
                                        />
                                    </div>
                                </Card>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                {/* Reservation Trends */}
                                <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                    <div className="border-b border-teal-500/20 px-6 py-4">
                                        <h2 className="font-semibold text-white">
                                            Reservation Trends
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        {reservationTrends.length > 0 ? (
                                            <ResponsiveContainer
                                                width="100%"
                                                height={300}
                                            >
                                                <LineChart
                                                    data={reservationTrends}
                                                >
                                                    <CartesianGrid
                                                        strokeDasharray="3 3"
                                                        stroke="#3f3f46"
                                                    />
                                                    <XAxis
                                                        dataKey="date"
                                                        stroke="#a1a1aa"
                                                    />
                                                    <YAxis stroke="#a1a1aa" />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor:
                                                                "#18181b",
                                                            border: "1px solid #3f3f46",
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="count"
                                                        stroke="#1dd1a1"
                                                        dot={{
                                                            fill: "#1dd1a1",
                                                            r: 5,
                                                        }}
                                                        activeDot={{ r: 7 }}
                                                        name="Reservations"
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <p className="text-center text-sm text-teal-200/60 py-12">
                                                No reservation data available
                                            </p>
                                        )}
                                    </div>
                                </Card>

                                {/* Call Volume Trends */}
                                <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                    <div className="border-b border-teal-500/20 px-6 py-4">
                                        <h2 className="font-semibold text-white">
                                            Call Volume Trends
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        {callVolumeTrends.length > 0 ? (
                                            <ResponsiveContainer
                                                width="100%"
                                                height={300}
                                            >
                                                <BarChart
                                                    data={callVolumeTrends}
                                                >
                                                    <CartesianGrid
                                                        strokeDasharray="3 3"
                                                        stroke="#3f3f46"
                                                    />
                                                    <XAxis
                                                        dataKey="date"
                                                        stroke="#a1a1aa"
                                                    />
                                                    <YAxis stroke="#a1a1aa" />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor:
                                                                "#18181b",
                                                            border: "1px solid #3f3f46",
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="calls"
                                                        fill="#1dd1a1"
                                                        name="Calls"
                                                        radius={[8, 8, 0, 0]}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <p className="text-center text-sm text-teal-200/60 py-12">
                                                No call data available
                                            </p>
                                        )}
                                    </div>
                                </Card>
                            </div>

                            {/* Status Breakdown */}
                            <Card className="border-teal-500/20 bg-[#1a1f3a]/60">
                                <div className="border-b border-teal-500/20 px-6 py-4">
                                    <h2 className="font-semibold text-white">
                                        Reservation Status Breakdown
                                    </h2>
                                </div>
                                <div className="p-6">
                                    {statusBreakdown.length > 0 ? (
                                        <div className="flex justify-center">
                                            <ResponsiveContainer
                                                width="100%"
                                                height={300}
                                            >
                                                <PieChart>
                                                    <Pie
                                                        data={statusBreakdown}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({
                                                            name,
                                                            value,
                                                        }) =>
                                                            `${name}: ${value}`
                                                        }
                                                        outerRadius={100}
                                                        fill="#1dd1a1"
                                                        dataKey="value"
                                                    >
                                                        {statusBreakdown.map(
                                                            (entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={
                                                                        COLORS[
                                                                            index %
                                                                                COLORS.length
                                                                        ]
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor:
                                                                "#18181b",
                                                            border: "1px solid #3f3f46",
                                                        }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <p className="text-center text-sm text-teal-200/60 py-12">
                                            No status data available
                                        </p>
                                    )}
                                </div>
                            </Card>
                        </section>
                    ) : null}

                    {activeSection === "Settings" ? (
                        <section className="mt-8 rounded-xl border border-teal-500/20 bg-[#1a1f3a]/60">
                            <div className="border-b border-teal-500/20 px-6 py-4">
                                <h2 className="text-lg font-semibold text-white">
                                    Hospital Settings
                                </h2>
                            </div>
                            <div className="p-6">
                                {isLoading ? (
                                    <p className="text-sm text-teal-200/60">
                                        Loading settings...
                                    </p>
                                ) : hasError ? (
                                    <p className="rounded-md border border-red-800/50 bg-red-900/20 px-3 py-2 text-sm text-red-400">
                                        {errorSection}
                                    </p>
                                ) : settings ? (
                                    <div className="space-y-3 text-sm text-teal-200/60">
                                        <p>
                                            <span className="font-medium text-white">
                                                Hospital name:
                                            </span>{" "}
                                            {settings.hospitalName}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                Email:
                                            </span>{" "}
                                            {settings.email}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                Phone:
                                            </span>{" "}
                                            {settings.phone}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                Address:
                                            </span>{" "}
                                            {settings.location?.address ||
                                                "N/A"}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                City:
                                            </span>{" "}
                                            {settings.location?.city || "N/A"}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                State:
                                            </span>{" "}
                                            {settings.location?.state || "N/A"}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                Zip:
                                            </span>{" "}
                                            {settings.location?.zipCode ||
                                                "N/A"}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                Country:
                                            </span>{" "}
                                            {settings.location?.country ||
                                                "N/A"}
                                        </p>
                                        <p>
                                            <span className="font-medium text-white">
                                                Availability:
                                            </span>{" "}
                                            {settings.availability || "N/A"}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-zinc-400">
                                        No settings data available.
                                    </p>
                                )}
                            </div>
                        </section>
                    ) : null}
                </main>
            </div>
        </div>
    );
}

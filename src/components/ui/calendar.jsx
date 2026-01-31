import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

function Calendar({
    className,
    classNameDay,
    showOutsideDays = true,
    ...props
}) {
    const [displayMonth, setDisplayMonth] = React.useState(new Date());

    const previousMonth = () => {
        setDisplayMonth(
            new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1),
        );
    };

    const nextMonth = () => {
        setDisplayMonth(
            new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1),
        );
    };

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const days = [];
    const daysInMonth = getDaysInMonth(displayMonth);
    const firstDay = getFirstDayOfMonth(displayMonth);

    // Add empty cells for days from previous month
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    return (
        <div className={cn("p-3", className)} {...props}>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={previousMonth}
                        className="p-1 hover:bg-accent rounded"
                        type="button"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="text-sm font-medium">
                        {displayMonth.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </div>
                    <button
                        onClick={nextMonth}
                        className="p-1 hover:bg-accent rounded"
                        type="button"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                            <div
                                key={day}
                                className="font-semibold text-muted-foreground"
                            >
                                {day}
                            </div>
                        ),
                    )}
                    {days.map((day, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={cn(
                                "p-2 rounded hover:bg-accent text-sm",
                                classNameDay,
                                day === null ? "invisible" : "",
                            )}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Calendar };

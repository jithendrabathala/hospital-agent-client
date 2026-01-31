import React from "react";

export function FollowerPointerCard({ title, children }) {
    return (
        <div>
            <div className="mb-4">{title}</div>
            <div>{children}</div>
        </div>
    );
}

"use client"

import { useState } from "react";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? "w-64" : "w-16"
                    } bg-gray-800 text-white transition-all duration-300 overflow-y-auto`}
            >
                {/* Sidebar Header */}
                <div className="p-4 text-lg font-bold border-b border-gray-700 flex items-center justify-between">
                    <span className={`${!isSidebarOpen && "hidden"} transition-opacity duration-300`}>
                        ChatGPT UI
                    </span>
                    <button
                        onClick={toggleSidebar}
                        className="text-white hover:bg-gray-700 p-1 rounded focus:outline-none"
                    >
                        {isSidebarOpen ? "<" : ">"}
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="mt-4 space-y-2">
                    {[
                        { label: "Dashboard", icon: "🏠" },
                        { label: "Messages", icon: "✉️" },
                        { label: "Settings", icon: "⚙️" },
                        { label: "Logout", icon: "🚪" },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href="#"
                            className="flex items-center py-2 px-4 hover:bg-gray-700"
                        >
                            {/* Icon */}
                            <span className="text-xl">{item.icon}</span>
                            {/* Label */}
                            <span
                                className={`ml-4 ${!isSidebarOpen && "hidden"
                                    } transition-opacity duration-300`}
                            >
                                {item.label}
                            </span>
                        </a>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">ChatGPT Mockup</h1>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className="text-gray-600">
                            This is the main content area. The sidebar shrinks to display only
                            icons when collapsed.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

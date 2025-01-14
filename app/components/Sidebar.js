"use client"

import { useState } from "react";
import Image from 'next/image';
import ArrowRightIcon from "../../public/arrow-right.svg";
import ArrowLeftIcon from "../../public/arrow-left.svg";
import Dashboard from "../../public/grid.svg";
import Message from "../../public/message-square.svg";
import Setting from "../../public/settings.svg";
import Logout from "../../public/log-out.svg";
import Grid from "../../public/grid.svg";

import Instagram from "../../public/instagram.svg";
import Facebook from "../../public/facebook.svg";
import Twitter from "../../public/twitter.svg";
import DropdownMenu from "./DropdownMenu";

export default function Sidebar({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOpenMenuDropdown = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? "w-60 bg-primary-bg" : "w-16"} transition-all duration-300 overflow-y-auto border-r border-r-neutral-950 fixed top-0 left-0 h-full`}
            >
                {/* Sidebar Header */}
                <div className="p-4 text-lg font-bold flex items-center justify-between">
                    <h1 className={`${!isSidebarOpen && "hidden"} transition-opacity duration-300`}>
                        CityHub Icon
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="text-white hover:bg-neutral-900"
                    >
                        {isSidebarOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="mt-5 space-y-2">
                    {[
                        { label: "Dashboard", icon: <Dashboard /> },
                        { label: "Messages", icon: <Message /> },
                        { label: "Settings", icon: <Setting /> },
                        { label: "Logout", icon: <Logout /> },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href="#"
                            className="flex items-center py-4 px-4 hover:bg-neutral-900"
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
            <div className="min-h-screen flex-1 flex flex-col px-10 ml-16">

                {/* Header */}
                <header className="shadow py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">CityHub</h1>

                    <div className="fixed right-6">
                        <span className="cursor-pointer" onClick={handleOpenMenuDropdown}>
                            <Grid />
                        </span>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    <div className="py-4 rounded shadow-md overflow-hidden">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center py-4">
                    <div className="flex items-center justify-center gap-6 mb-10">
                        <Instagram />
                        <Facebook />
                        <Twitter />
                    </div>
                    © 2025 Metro Visual Perkasa. All Rights Reserved.
                </footer>
            </div>

            {/* Dropdown Menu */}
            <DropdownMenu isMenuOpen={isMenuOpen}/>
        </div>
    );
}

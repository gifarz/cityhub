"use client"

import { useState } from "react";
import Image from 'next/image';
import ArrowRightIcon from "../../public/arrow-right.svg";
import ArrowLeftIcon from "../../public/arrow-left.svg";
import Dashboard from "../../public/grid.svg";
import Message from "../../public/message-square.svg";
import Setting from "../../public/settings.svg";
import Logout from "../../public/log-out.svg";
import Bell from "../../public/bell.svg";

import Instagram from "../../public/instagram.svg";
import Facebook from "../../public/facebook.svg";
import Twitter from "../../public/twitter.svg";

export default function SidebarMPP({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menu = [
        { label: "Beranda", icon: <Dashboard className="sm:w-8 lg:w-8" /> },
        { label: "Fasilitas", icon: <Message className="sm:w-8 lg:w-8" /> },
        { label: "Gallery", icon: <Setting className="sm:w-8 lg:w-8" /> },
        { label: "Instansi", icon: <Logout className="sm:w-8 lg:w-8" /> },
        { label: "Berita", icon: <Logout className="sm:w-8 lg:w-8" /> },
        { label: "SKM", icon: <Logout className="sm:w-8 lg:w-8" /> },
        { label: "Statistik", icon: <Logout className="sm:w-8 lg:w-8" /> },
    ]

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
                className={`${isSidebarOpen ? "w-60 bg-primary-bg" : "w-0"} lg:hidden transition-all duration-300 overflow-y-auto border-r border-r-neutral-950 fixed top-0 left-0 h-full`}
            >
                {/* Sidebar Header */}
                <div className="p-4 text-lg font-bold flex items-center justify-between">
                    <h1 className={`${!isSidebarOpen && "hidden"} transition-opacity duration-300`}>
                        MPP
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
                    {
                        menu.map((item, i) => (
                            <a
                                key={i}
                                href="#"
                                className="flex items-center p-4 hover:bg-neutral-900"
                            >
                                <span className="mr-4">{item.icon}</span>
                                <span
                                    className={`ml-4 ${!isSidebarOpen && "hidden"} transition-opacity duration-300`}
                                >
                                    {item.label}
                                </span>
                            </a>
                        ))
                    }
                </nav>
            </div>

            {/* Main Content */}
            <div className="min-h-screen flex-1 flex flex-col px-10 py-5 lg:ml-0">
                {/* Header */}
                <header className="shadow py-4 flex justify-between items-center">
                    <button
                        onClick={toggleSidebar}
                        className="inline-block text-xl lg:hidden"
                    >
                        {isSidebarOpen ? "☰" : "☷"}
                    </button>
                    <h1 className="text-xl font-semibold">CityHub</h1>

                    <div className="hidden lg:flex gap-4 xl:gap-8">
                        {
                            menu.map((item, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="flex gap-1 items-center hover:bg-neutral-900 xl:text-lg"
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </a>
                            ))
                        }
                    </div>

                    <span><Bell /></span>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    {children}
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
        </div>
    );
}
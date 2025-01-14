import React from 'react'
import { useRouter } from 'next/navigation'
import Calendar from "../../public/calendar.svg";
import Drive from "../../public/database.svg";
import Home from "../../public/home.svg";

export default function DropdownMenu({isMenuOpen}){
    const router = useRouter()

    return (
        <div>
            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div className="fixed top-12 right-6 z-10 shadow-lg p-4 w-64 bg-neutral-900">
                    <div className="grid grid-cols-3 gap-2">
                        {/* Menu Items */}
                        {[
                            { name: "Account", icon: <Home />, directTo: "/", directTo: "/"},
                            { name: "CityHub", icon: <Home />, directTo: "/" },
                            { name: "Maps", icon: <Home />, directTo: "/" },
                            { name: "YouTube", icon: <Home />, directTo: "/" },
                            { name: "Play", icon: <Home />, directTo: "/" },
                            { name: "News", icon: <Home />, directTo: "/" },
                            { name: "Gmail", icon: <Home />, directTo: "/" },
                            { name: "Drive", icon: <Drive />, directTo: "/" },
                            { name: "Calendar", icon: <Calendar />, directTo: "/calendar" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center hover:bg-neutral-800 px-10 py-4 rounded-lg cursor-pointer"
                                onClick={() => router.push(item.directTo)}
                            >
                                <span className="mb-1">{item.icon}</span>
                                <span className="text-sm">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
import React from 'react';
import { Plane, User, Menu } from 'lucide-react';

interface NavbarProps {
    onHistoryClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHistoryClick }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Plane className="text-white w-6 h-6 rotate-45" />
                    </div>
                    <span className="text-xl font-outfit font-bold tracking-tight text-white">
                        SkyReserve<span className="text-indigo-400">.</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Flights</button>
                    <button onClick={onHistoryClick} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">My Bookings</button>
                    <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Promotions</button>
                    <button className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm">
                        <User className="w-4 h-4" />
                        Sign In
                    </button>
                </div>

                <button className="md:hidden text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};

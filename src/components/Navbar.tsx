import React from 'react';
import { Plane, User, Menu } from 'lucide-react';

interface NavbarProps {
    onHistoryClick: () => void;
    onSignInClick: () => void;
    user: { name: string; email: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onHistoryClick, onSignInClick, user }) => {
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
                    {user ? (
                        <button className="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-2 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group">
                            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-white leading-none mb-1">{user.name}</p>
                                <p className="text-[10px] text-slate-500 leading-none">Loyalty Member</p>
                            </div>
                        </button>
                    ) : (
                        <button onClick={onSignInClick} className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm">
                            <User className="w-4 h-4" />
                            Sign In
                        </button>
                    )}
                </div>

                <button className="md:hidden text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};

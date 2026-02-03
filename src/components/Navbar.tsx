import React from 'react';
import { Plane, User, Menu } from 'lucide-react';

interface NavbarProps {
    onHistoryClick: () => void;
    onSignInClick: () => void;
    onLogout: () => void;
    onPageChange: (page: string) => void;
    user: { name: string; email: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onHistoryClick, onSignInClick, onLogout, onPageChange, user }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onPageChange('home')}>
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <Plane className="text-white w-6 h-6 rotate-45" />
                    </div>
                    <span className="text-xl font-outfit font-bold tracking-tight text-white">
                        SkyReserve<span className="text-indigo-400">.</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => onPageChange('home')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Flights</button>
                    <button onClick={onHistoryClick} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">My Bookings</button>
                    <button onClick={() => onPageChange('promotions')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Promotions</button>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-2 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-white leading-none mb-1">{user.name}</p>
                                    <p className="text-[10px] text-slate-500 leading-none">Loyalty Member</p>
                                </div>
                            </button>
                            <button
                                onClick={onLogout}
                                className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center hover:bg-red-500 transition-all text-red-500 hover:text-white border border-red-500/20"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            </button>
                        </div>
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

import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
    onSearch: (params: { origin: string; destination: string; date: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
    const [search, setSearch] = useState({
        origin: '',
        destination: '',
        date: '',
        passengers: 1
    });

    const handleSearchClick = () => {
        onSearch(search);
    };

    return (
        <div className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* ... background ... */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-600/20 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                {/* ... text ... */}
                <div className="max-w-3xl mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-outfit font-bold leading-tight mb-6"
                    >
                        Your Journey <br />
                        <span className="text-indigo-400">Begins in the Skies.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400 max-w-xl"
                    >
                        Experience premium air travel with SkyReserve. Exceptional service,
                        exclusive destinations, and effortless booking starting from today.
                    </motion.p>
                </div>

                {/* Search Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-[32px] p-8 md:p-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">From</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                                <input
                                    type="text"
                                    placeholder="San Francisco (SFO)"
                                    className="input-field w-full pl-12 h-14"
                                    value={search.origin}
                                    onChange={(e) => setSearch({ ...search, origin: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">To</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                                <input
                                    type="text"
                                    placeholder="London (LHR)"
                                    className="input-field w-full pl-12 h-14"
                                    value={search.destination}
                                    onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                                <input
                                    type="date"
                                    className="input-field w-full pl-12 h-14 text-slate-300"
                                    value={search.date}
                                    onChange={(e) => setSearch({ ...search, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 flex flex-col">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Action</label>
                            <button
                                onClick={handleSearchClick}
                                className="btn-primary h-14 flex items-center justify-center gap-2 group"
                            >
                                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Search Flights
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

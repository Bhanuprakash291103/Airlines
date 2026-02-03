import React from 'react';
import { motion } from 'framer-motion';
import type { Flight } from '../types';
import { Plane, ArrowRight, Clock, Sun, Cloud, CloudRain, Zap } from 'lucide-react';

interface FlightCardProps {
    flight: Flight;
    onBook: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onBook }) => {
    const WeatherIcon = () => {
        switch (flight.weather?.condition) {
            case 'Sunny': return <Sun className="w-4 h-4 text-yellow-500" />;
            case 'Cloudy': return <Cloud className="w-4 h-4 text-slate-400" />;
            case 'Rainy': return <CloudRain className="w-4 h-4 text-blue-400" />;
            default: return <Sun className="w-4 h-4 text-yellow-500" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden group"
        >
            {/* Background Glow on Hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                {/* Airline Info */}
                <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center p-3 border border-white/5">
                        <img src={flight.airlineLogo} alt={flight.airline} className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">{flight.airline}</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{flight.class}</span>
                            {flight.pointsEarned && (
                                <span className="text-[10px] flex items-center gap-1 text-slate-500 font-medium">
                                    <Zap className="w-3 h-3 text-yellow-500/50" />
                                    +{flight.pointsEarned} pts
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Flight Path */}
                <div className="flex-1 flex items-center justify-center gap-8 px-4">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{flight.origin}</h3>
                        <p className="text-xs text-slate-500 font-medium">{flight.departureTime}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-2 relative max-w-[120px]">
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                        <div className="relative z-10 p-2 bg-luxury-800 rounded-full border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                            <Plane className="w-4 h-4 text-indigo-400 rotate-90" />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            <Clock className="w-3 h-3" />
                            {flight.duration}
                        </div>
                    </div>

                    <div className="text-center relative">
                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{flight.destination}</h3>
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-xs text-slate-500 font-medium">{flight.arrivalTime}</p>
                            {flight.weather && (
                                <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                                    <WeatherIcon />
                                    <span className="text-[10px] text-slate-300 font-bold">{flight.weather.temp}°C</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pr-2">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Premium Flight</p>
                        <h2 className="text-3xl font-black text-white">${flight.price}</h2>
                    </div>
                    <button
                        onClick={() => onBook(flight)}
                        className="btn-primary py-3 px-8 text-sm flex items-center gap-2 hover:translate-x-1"
                    >
                        Book Selection
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

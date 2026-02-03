import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Plane, Trash2 } from 'lucide-react';

interface BookingHistoryProps {
    isOpen: boolean;
    onClose: () => void;
    bookings: any[];
    onCancel: (id: string) => void;
}

export const BookingHistory: React.FC<BookingHistoryProps> = ({ isOpen, onClose, bookings, onCancel }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-md h-full bg-luxury-900 border-l border-white/5 shadow-2xl p-8 overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white font-outfit">My Bookings</h2>
                                <p className="text-slate-500 text-sm">You have {bookings.length} reservations</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {bookings.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                                        <Plane className="text-slate-600 w-8 h-8 rotate-45" />
                                    </div>
                                    <p className="text-slate-500 font-medium">No bookings yet</p>
                                    <p className="text-xs text-slate-600 mt-2">Start your journey today!</p>
                                </div>
                            ) : (
                                bookings.map((booking, idx) => (
                                    <motion.div
                                        key={booking.bookingId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="gap-4 p-5 glass-card rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                                                ID: {booking.bookingId}
                                            </span>
                                            <button
                                                onClick={() => onCancel(booking.bookingId)}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-left">
                                                <h4 className="text-lg font-bold text-white">{booking.origin}</h4>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Departure</p>
                                            </div>
                                            <Plane className="w-4 h-4 text-indigo-500/30 rotate-90" />
                                            <div className="text-right">
                                                <h4 className="text-lg font-bold text-white">{booking.destination}</h4>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Arrival</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{booking.date}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-white">${booking.price}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

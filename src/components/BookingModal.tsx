import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, PlaneTakeoff, ShieldCheck, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Flight } from '../types';
import { cn } from '../lib/utils';

interface BookingModalProps {
    flight: Flight | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ flight, isOpen, onClose, onConfirm }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
    const [extras, setExtras] = useState({
        baggage: false,
        insurance: false
    });

    if (!flight) return null;

    const extrasPrice = (extras.baggage ? 45 : 0) + (extras.insurance ? 25 : 0);
    const seatPrice = selectedSeat?.match(/^[1-2]/) ? 50 : 0; // Extra for front rows
    const totalPrice = flight.price + extrasPrice + seatPrice;

    const handleNext = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                onConfirm();
            }, 2000);
        }
    };

    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const cols = ['A', 'B', 'C', '', 'D', 'E', 'F']; // Empty string for aisle

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl glass-card rounded-[32px] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Complete Booking</h3>
                                <p className="text-slate-400 text-sm">Step {step} of 5</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-8 custom-scrollbar">
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-4 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                                        <PlaneTakeoff className="w-6 h-6 text-indigo-400" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Flight Selected</p>
                                            <h4 className="text-white font-semibold">{flight.origin} to {flight.destination} ({flight.airline})</h4>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <p className="text-xl font-bold text-white">${flight.price}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                                            <input type="text" placeholder="John" className="input-field w-full" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                                            <input type="text" placeholder="Doe" className="input-field w-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                                        <input type="email" placeholder="john@example.com" className="input-field w-full" />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <h4 className="text-white font-bold text-lg mb-4 text-center">Enhance Your Journey</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        <button
                                            onClick={() => setExtras({ ...extras, baggage: !extras.baggage })}
                                            className={cn(
                                                "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                                                extras.baggage ? "bg-indigo-600/10 border-indigo-500/50" : "bg-white/5 border-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn("p-3 rounded-xl", extras.baggage ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400")}>
                                                    <Briefcase className="w-6 h-6" />
                                                </div>
                                                <div className="text-left">
                                                    <h5 className="text-white font-bold">Extra Baggage</h5>
                                                    <p className="text-xs text-slate-400">+23kg checked-in bag</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-white">+$45</span>
                                        </button>

                                        <button
                                            onClick={() => setExtras({ ...extras, insurance: !extras.insurance })}
                                            className={cn(
                                                "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                                                extras.insurance ? "bg-indigo-600/10 border-indigo-500/50" : "bg-white/5 border-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn("p-3 rounded-xl", extras.insurance ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400")}>
                                                    <ShieldCheck className="w-6 h-6" />
                                                </div>
                                                <div className="text-left">
                                                    <h5 className="text-white font-bold">Travel Insurance</h5>
                                                    <p className="text-xs text-slate-400">Full medical & trip coverage</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-white">+$25</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    <div className="text-center">
                                        <h4 className="text-white font-bold text-lg">Select Your Seat</h4>
                                        <div className="flex items-center justify-center gap-6 mt-4 text-[10px] uppercase tracking-widest font-bold">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-white/5 rounded-sm border border-white/10" />
                                                <span className="text-slate-500">Available</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-indigo-600 rounded-sm" />
                                                <span className="text-slate-500">Selected</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-white/20 rounded-sm" />
                                                <span className="text-slate-500">Occupied</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 bg-luxury-900/50 p-8 rounded-3xl border border-white/5">
                                        {rows.map(row => (
                                            <div key={row} className="flex items-center gap-2">
                                                <span className="w-5 text-[10px] text-slate-600 font-bold">{row}</span>
                                                {cols.map((col) => {
                                                    if (col === '') return <div key={`aisle-${row}`} className="w-6" />;
                                                    const id = `${row}${col}`;
                                                    const isSelected = selectedSeat === id;
                                                    const isOccupied = !isSelected && (row + id.charCodeAt(1)) % 7 === 0;

                                                    return (
                                                        <button
                                                            key={id}
                                                            disabled={isOccupied}
                                                            onClick={() => setSelectedSeat(id)}
                                                            className={cn(
                                                                "w-8 h-8 rounded-lg text-[10px] font-bold transition-all duration-300",
                                                                isSelected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-110" :
                                                                    isOccupied ? "bg-white/10 text-transparent cursor-not-allowed" :
                                                                        "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5"
                                                            )}
                                                        >
                                                            {col}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                    {selectedSeat && (
                                        <p className="text-center text-indigo-400 font-bold text-sm">
                                            Seat {selectedSeat} Selected {selectedSeat.match(/^[1-2]/) ? '(+$50 Premium)' : ''}
                                        </p>
                                    )}
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <h4 className="flex items-center gap-2 text-white font-semibold mb-4">
                                        <CreditCard className="w-5 h-5 text-indigo-400" />
                                        Payment Details
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Card Number</label>
                                            <input type="text" placeholder="**** **** **** ****" className="input-field w-full" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Expiry Date</label>
                                                <input type="text" placeholder="MM/YY" className="input-field w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">CVV</label>
                                                <input type="text" placeholder="***" className="input-field w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Final Confirmation</h3>
                                    <p className="text-slate-400 max-w-xs mx-auto mb-6">
                                        Your card will be charged <span className="text-white font-bold">${totalPrice}</span> for flight {flight.id} to {flight.destination}.
                                    </p>
                                    <div className="glass-card p-4 rounded-2xl flex items-center justify-between text-left">
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Seat Assigned</p>
                                            <p className="text-white font-bold">{selectedSeat || 'Not selected'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Boarding Group</p>
                                            <p className="text-white font-bold">{selectedSeat?.match(/^[1-2]/) ? 'Priority' : 'General'}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 bg-white/5 flex flex-col gap-6">
                            <div className="flex items-center justify-between text-white font-bold px-2">
                                <span className="text-slate-500 font-medium">Total Amount</span>
                                <span className="text-2xl">${totalPrice}</span>
                            </div>
                            <div className="flex gap-4">
                                {step > 1 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="btn-secondary flex-1 py-4"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={loading || (step === 3 && !selectedSeat)}
                                    className={cn(
                                        "btn-primary flex-1 py-4 flex items-center justify-center gap-2",
                                        (loading || (step === 3 && !selectedSeat)) && "opacity-70 cursor-not-allowed"
                                    )}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        step === 5 ? 'Confirm & Process' : 'Continue'
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

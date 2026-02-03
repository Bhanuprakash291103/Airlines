import React from 'react';
import { Shield, FileText, HelpCircle, Mail, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface InfoPageProps {
    type: 'privacy' | 'terms' | 'support';
}

export const InfoPage: React.FC<InfoPageProps> = ({ type }) => {
    const config = {
        privacy: {
            title: 'Privacy Policy',
            subtitle: 'Last updated: February 2026',
            icon: <Shield className="w-8 h-8 text-indigo-400" />,
            content: (
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xl font-bold text-white mb-4">Data Collection</h3>
                        <p className="text-slate-400 leading-relaxed">
                            We collect personal information that you provide to us, such as your name, email address, payment information, and travel preferences when you use our service. This data is essential for processing your flight reservations and providing a personalized experience.
                        </p>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-white mb-4">Use of Information</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Your information is used to confirm bookings, send travel updates, process payments, and improve our services. We also use data to provide custom promotions and loyalty rewards through our SkyReserve program.
                        </p>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-white mb-4">Data Security</h3>
                        <p className="text-slate-400 leading-relaxed">
                            We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure. Your payment information is encrypted and processed through secure gateways.
                        </p>
                    </section>
                </div>
            )
        },
        terms: {
            title: 'Terms of Service',
            subtitle: 'Effective Date: Jan 1, 2026',
            icon: <FileText className="w-8 h-8 text-indigo-400" />,
            content: (
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xl font-bold text-white mb-4">Booking Agreement</h3>
                        <p className="text-slate-400 leading-relaxed">
                            By making a reservation through SkyReserve, you enter into a direct contractual relationship with the airline. We act as an intermediary, facilitating the booking process and providing a platform for management.
                        </p>
                    </section>
                    <section>
                        <h3 className="text-xl font-bold text-white mb-4">Cancellations & Refunds</h3>
                        <p className="text-slate-400 leading-relaxed">
                            Cancellation policies vary by airline and ticket class. Users are responsible for reviewing the specific terms associated with their selected flight. Refunds, where applicable, are processed back to the original payment method.
                        </p>
                    </section>
                </div>
            )
        },
        support: {
            title: 'Help & Support',
            subtitle: 'We are here to help you 24/7',
            icon: <HelpCircle className="w-8 h-8 text-indigo-400" />,
            content: (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 glass-card rounded-2xl border border-white/5 text-center">
                            <Phone className="w-6 h-6 text-indigo-400 mx-auto mb-4" />
                            <h4 className="text-white font-bold mb-2">Call Us</h4>
                            <p className="text-slate-500 text-sm">International: +1 800 SKY FLY</p>
                        </div>
                        <div className="p-6 glass-card rounded-2xl border border-white/5 text-center">
                            <Mail className="w-6 h-6 text-indigo-400 mx-auto mb-4" />
                            <h4 className="text-white font-bold mb-2">Email</h4>
                            <p className="text-slate-500 text-sm">support@skyreserve.com</p>
                        </div>
                        <div className="p-6 glass-card rounded-2xl border border-white/5 text-center">
                            <MessageSquare className="w-6 h-6 text-indigo-400 mx-auto mb-4" />
                            <h4 className="text-white font-bold mb-2">Live Chat</h4>
                            <p className="text-slate-500 text-sm">Average response: 2 mins</p>
                        </div>
                    </div>
                    <section>
                        <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {[
                                "How do I change my flight?",
                                "What is the baggage allowance?",
                                "Can I get a refund for my booking?"
                            ].map((q, i) => (
                                <button key={i} className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-slate-300 font-medium flex justify-between items-center">
                                    {q}
                                    <span className="text-indigo-400">+</span>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            )
        }
    };

    const current = config[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-6 py-32"
        >
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-[20px] flex items-center justify-center border border-indigo-500/20 shadow-xl shadow-indigo-500/10">
                    {current.icon}
                </div>
                <div>
                    <h2 className="text-4xl font-outfit font-bold text-white mb-2">{current.title}</h2>
                    <p className="text-slate-500 font-medium">{current.subtitle}</p>
                </div>
            </div>

            <div className="glass-card p-12 rounded-[40px] border border-white/5">
                {current.content}
            </div>
        </motion.div>
    );
};

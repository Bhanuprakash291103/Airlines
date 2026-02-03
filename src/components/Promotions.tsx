import React from 'react';
import { Tag, Plane, Sparkles, Timer, ArrowRight, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_PROMOS = [
    {
        id: 1,
        title: 'European Summer Sale',
        description: 'Experience the magic of Europe this summer with up to 30% off on all flights to London, Paris, and Rome.',
        code: 'SUMMER30',
        discount: '30% OFF',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        color: 'from-blue-600 to-indigo-600'
    },
    {
        id: 2,
        title: 'Tropical Paradise Escape',
        description: 'Book your dream getaway to Bali or the Maldives. Premium Economy starting from just $899.',
        code: 'ISLANDVIBES',
        discount: '$200 OFF',
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
        color: 'from-emerald-500 to-teal-600'
    },
    {
        id: 3,
        title: 'Business Class Upgrade',
        description: 'Treat yourself to ultimate comfort. Instant upgrades available for selected trans-Atlantic routes.',
        code: 'ELITEFLY',
        discount: 'UPGRADE',
        image: 'https://images.unsplash.com/photo-1540339832862-4745a9805ad0?auto=format&fit=crop&w=800&q=80',
        color: 'from-purple-600 to-pink-600'
    }
];

export const Promotions: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-32">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 mb-6"
                >
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-bold text-indigo-400 tracking-wider uppercase">Exclusive Offers</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl font-outfit font-bold text-white mb-6"
                >
                    Fly More, <span className="text-indigo-500">Spend Less</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 max-w-2xl mx-auto text-lg"
                >
                    Discover our latest deals and promotions tailored to bring you closer to your next adventure.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PROMOS.map((promo, index) => (
                    <motion.div
                        key={promo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative h-[450px] rounded-[32px] overflow-hidden bg-luxury-900 border border-white/5"
                    >
                        <div className="absolute inset-0">
                            <img
                                src={promo.image}
                                alt={promo.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/50 to-transparent" />
                        </div>

                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r mb-4 w-fit text-xs font-bold text-white", promo.color)}>
                                <Tag className="w-3 h-3" />
                                {promo.discount}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                {promo.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                                {promo.description}
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Use Code</p>
                                    <p className="text-white font-mono font-bold tracking-wider">{promo.code}</p>
                                </div>
                                <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all group/btn">
                                    <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 p-12 glass-card rounded-[40px] border border-indigo-500/20 bg-indigo-500/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-white">Subscribe to Newsletter</h3>
                    <p className="text-slate-400">Be the first to know about new deals and exclusive member-only offers.</p>
                </div>
                <div className="flex w-full md:w-auto gap-4">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="input-field flex-1 md:w-80"
                    />
                    <button className="btn-primary whitespace-nowrap px-8">Join Now</button>
                </div>
            </div>
        </section>
    );
};

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

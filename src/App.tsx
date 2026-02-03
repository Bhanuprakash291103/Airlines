import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlightCard } from './components/FlightCard';
import { BookingModal } from './components/BookingModal';
import { BookingHistory } from './components/BookingHistory';
import { AuthModal } from './components/AuthModal';
import type { Flight } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, CheckCircle2 } from 'lucide-react';

const MOCK_FLIGHTS: Flight[] = [
  {
    id: '1',
    airline: 'Oceanic Air',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/753/753314.png',
    origin: 'SFO',
    destination: 'LHR',
    departureTime: '10:00 AM',
    arrivalTime: '6:30 AM +1',
    duration: '11h 30m',
    price: 1250,
    class: 'Business',
    weather: { temp: 18, condition: 'Cloudy' },
    pointsEarned: 2500
  },
  {
    id: '2',
    airline: 'SkyHigh Airlines',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    origin: 'SFO',
    destination: 'CDG',
    departureTime: '2:15 PM',
    arrivalTime: '10:45 AM +1',
    duration: '10h 30m',
    price: 980,
    class: 'Economy',
    weather: { temp: 22, condition: 'Sunny' },
    pointsEarned: 1200
  },
  {
    id: '3',
    airline: 'Elite Airways',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/811/811631.png',
    origin: 'JFK',
    destination: 'DXB',
    departureTime: '11:50 PM',
    arrivalTime: '8:20 PM',
    duration: '13h 30m',
    price: 4500,
    class: 'First',
    weather: { temp: 34, condition: 'Clear' },
    pointsEarned: 9000
  }
];

function App() {
  const [flights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('skyreserve_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Economy' | 'Business' | 'First'>('All');
  const [searchParams, setSearchParams] = useState({ origin: '', destination: '' });
  const [bookings, setBookings] = useState<any[]>(() => {
    const saved = localStorage.getItem('skyreserve_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('skyreserve_user', JSON.stringify(userData));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const filteredFlights = flights.filter(f => {
    const matchesFilter = activeFilter === 'All' || f.class === activeFilter;
    const matchesOrigin = !searchParams.origin || f.origin.toLowerCase().includes(searchParams.origin.toLowerCase());
    const matchesDest = !searchParams.destination || f.destination.toLowerCase().includes(searchParams.destination.toLowerCase());
    return matchesFilter && matchesOrigin && matchesDest;
  });

  const handleBook = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const handleConfirmOrder = () => {
    if (selectedFlight) {
      const newBooking = {
        ...selectedFlight,
        bookingId: Math.random().toString(36).substring(7).toUpperCase(),
        date: new Date().toLocaleDateString()
      };
      const updatedBookings = [newBooking, ...bookings];
      setBookings(updatedBookings);
      localStorage.setItem('skyreserve_bookings', JSON.stringify(updatedBookings));
    }
    setIsModalOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter(b => b.bookingId !== id);
    setBookings(updated);
    localStorage.setItem('skyreserve_bookings', JSON.stringify(updated));
  };

  const handleHeroSearch = (params: { origin: string; destination: string }) => {
    setSearchParams(params);
    // Smooth scroll to results
    const resultsSection = document.getElementById('flight-results');
    resultsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar
        onHistoryClick={() => setIsHistoryOpen(true)}
        onSignInClick={() => setIsAuthOpen(true)}
        user={user}
      />

      <main>
        <Hero onSearch={handleHeroSearch} />

        <section id="flight-results" className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-outfit font-bold text-white mb-2">Popular Flights</h2>
              <p className="text-slate-500">Curated destinations just for you.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 bg-luxury-800/50 p-1.5 rounded-2xl border border-white/5">
              <div className="px-3 text-slate-500">
                <Filter className="w-4 h-4" />
              </div>
              {['All', 'Economy', 'Business', 'First'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${activeFilter === filter
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FlightCard flight={flight} onBook={handleBook} />
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredFlights.length === 0 && (
              <div className="text-center py-20 glass-card rounded-3xl">
                <p className="text-slate-500 font-medium">No flights found matching this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-luxury-800/20 py-24 mb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h4 className="text-xl font-bold text-white">Global Network</h4>
                <p className="text-slate-400">Fly to over 200 destinations across 6 continents with our extensive airline partners.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="text-xl font-bold text-white">Luxury Experience</h4>
                <p className="text-slate-400">From airport lounges to in-flight dining, every detail is crafted for your comfort.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="text-xl font-bold text-white">Safe & Secure</h4>
                <p className="text-slate-400">Highest safety standards and secure booking process for a worry-free journey.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs rotate-45">✈️</span>
            </div>
            <span className="text-lg font-outfit font-bold text-white">SkyReserve</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 SkyReserve. Elevating your travel experience.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

      <BookingModal
        flight={selectedFlight}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
      />

      <BookingHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        bookings={bookings}
        onCancel={handleCancelBooking}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl shadow-green-600/20 flex items-center gap-3 font-bold"
          >
            <CheckCircle2 className="w-5 h-5" />
            {user ? `Logged in as ${user.name}` : 'Reservation Confirmed Successfully!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

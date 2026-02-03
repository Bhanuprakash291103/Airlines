import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlightCard } from './components/FlightCard';
import { BookingModal } from './components/BookingModal';
import { BookingHistory } from './components/BookingHistory';
import { AuthModal } from './components/AuthModal';
import { Promotions } from './components/Promotions';
import { InfoPage } from './components/InfoPages';
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
    pointsEarned: 2500,
    date: '2026-02-15'
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
    pointsEarned: 1200,
    date: '2026-02-15'
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
    pointsEarned: 9000,
    date: '2026-02-16'
  },
  {
    id: '4',
    airline: 'Global Wing',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/753/753314.png',
    origin: 'LHR',
    destination: 'HND',
    departureTime: '8:00 AM',
    arrivalTime: '5:45 AM +1',
    duration: '12h 45m',
    price: 1100,
    class: 'Economy',
    weather: { temp: 12, condition: 'Rainy' },
    pointsEarned: 1800,
    date: '2026-02-16'
  },
  {
    id: '5',
    airline: 'Pacific Blue',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    origin: 'SYD',
    destination: 'LAX',
    departureTime: '10:30 PM',
    arrivalTime: '6:15 PM',
    duration: '13h 45m',
    price: 2800,
    class: 'Business',
    weather: { temp: 25, condition: 'Clear' },
    pointsEarned: 4500,
    date: '2026-02-17'
  },
  {
    id: '6',
    airline: 'IndiGo',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Indigo_Logo.svg/1200px-Indigo_Logo.svg.png',
    origin: 'DEL',
    destination: 'BOM',
    departureTime: '6:00 AM',
    arrivalTime: '8:15 AM',
    duration: '2h 15m',
    price: 4500,
    class: 'Economy',
    weather: { temp: 30, condition: 'Clear' },
    pointsEarned: 500,
    date: '2026-02-15'
  },
  {
    id: '7',
    airline: 'Air India',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png',
    origin: 'BOM',
    destination: 'BLR',
    departureTime: '10:30 AM',
    arrivalTime: '12:15 PM',
    duration: '1h 45m',
    price: 3800,
    class: 'Economy',
    weather: { temp: 28, condition: 'Cloudy' },
    pointsEarned: 400,
    date: '2026-02-15'
  },
  {
    id: '8',
    airline: 'Vistara',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Vistara_logo.svg/1024px-Vistara_logo.svg.png',
    origin: 'BLR',
    destination: 'HYD',
    departureTime: '2:45 PM',
    arrivalTime: '4:00 PM',
    duration: '1h 15m',
    price: 8500,
    class: 'Business',
    weather: { temp: 32, condition: 'Sunny' },
    pointsEarned: 1200,
    date: '2026-02-15'
  },
  {
    id: '9',
    airline: 'SpiceJet',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png',
    origin: 'MAA',
    destination: 'CCU',
    departureTime: '5:20 PM',
    arrivalTime: '7:45 PM',
    duration: '2h 25m',
    price: 5200,
    class: 'Economy',
    weather: { temp: 26, condition: 'Rainy' },
    pointsEarned: 600,
    date: '2026-02-16'
  },
  {
    id: '10',
    airline: 'IndiGo',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Indigo_Logo.svg/1200px-Indigo_Logo.svg.png',
    origin: 'DEL',
    destination: 'GOI',
    departureTime: '11:15 AM',
    arrivalTime: '1:45 PM',
    duration: '2h 30m',
    price: 6800,
    class: 'Economy',
    weather: { temp: 29, condition: 'Sunny' },
    pointsEarned: 700,
    date: '2026-02-16'
  },
  {
    id: '11',
    airline: 'Air India',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png',
    origin: 'HYD',
    destination: 'MAA',
    departureTime: '8:45 AM',
    arrivalTime: '10:00 AM',
    duration: '1h 15m',
    price: 3200,
    class: 'Economy',
    weather: { temp: 31, condition: 'Clear' },
    pointsEarned: 350,
    date: '2026-02-16'
  },
  {
    id: '12',
    airline: 'Vistara',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Vistara_logo.svg/1024px-Vistara_logo.svg.png',
    origin: 'CCU',
    destination: 'DEL',
    departureTime: '12:00 PM',
    arrivalTime: '2:25 PM',
    duration: '2h 25m',
    price: 12500,
    class: 'Business',
    weather: { temp: 24, condition: 'Cloudy' },
    pointsEarned: 1800,
    date: '2026-02-17'
  },
  {
    id: '13',
    airline: 'SpiceJet',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png',
    origin: 'PNQ',
    destination: 'AMD',
    departureTime: '4:10 PM',
    arrivalTime: '5:35 PM',
    duration: '1h 25m',
    price: 2900,
    class: 'Economy',
    weather: { temp: 27, condition: 'Sunny' },
    pointsEarned: 300,
    date: '2026-02-17'
  },
  {
    id: '14',
    airline: 'IndiGo',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Indigo_Logo.svg/1200px-Indigo_Logo.svg.png',
    origin: 'DEL',
    destination: 'LXR',
    departureTime: '10:00 AM',
    arrivalTime: '11:45 AM',
    duration: '1h 45m',
    price: 4100,
    class: 'Economy',
    weather: { temp: 22, condition: 'Clear' },
    pointsEarned: 450,
    date: '2026-02-18'
  },
  {
    id: '15',
    airline: 'Air India Express',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png',
    origin: 'COK',
    destination: 'DXB',
    departureTime: '11:55 PM',
    arrivalTime: '2:30 AM',
    duration: '4h 05m',
    price: 18000,
    class: 'Economy',
    weather: { temp: 33, condition: 'Clear' },
    pointsEarned: 2200,
    date: '2026-02-15'
  },
  {
    id: '16',
    airline: 'Lufthansa',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/753/753314.png',
    origin: 'DEL',
    destination: 'FRA',
    departureTime: '2:10 AM',
    arrivalTime: '7:30 AM',
    duration: '8h 50m',
    price: 75000,
    class: 'Business',
    weather: { temp: 8, condition: 'Rainy' },
    pointsEarned: 6500,
    date: '2026-02-15'
  },
  {
    id: '17',
    airline: 'Emirates',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/811/811631.png',
    origin: 'BOM',
    destination: 'DXB',
    departureTime: '4:30 PM',
    arrivalTime: '6:15 PM',
    duration: '3h 15m',
    price: 110000,
    class: 'First',
    weather: { temp: 34, condition: 'Clear' },
    pointsEarned: 12000,
    date: '2026-02-16'
  },
  {
    id: '18',
    airline: 'Singapore Airlines',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    origin: 'BLR',
    destination: 'SIN',
    departureTime: '11:10 PM',
    arrivalTime: '6:00 AM',
    duration: '4h 20m',
    price: 45000,
    class: 'Business',
    weather: { temp: 29, condition: 'Rainy' },
    pointsEarned: 4800,
    date: '2026-02-16'
  },
  {
    id: '19',
    airline: 'Qatar Airways',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/811/811631.png',
    origin: 'DOH',
    destination: 'JFK',
    departureTime: '8:15 AM',
    arrivalTime: '3:30 PM',
    duration: '14h 15m',
    price: 185000,
    class: 'First',
    weather: { temp: 15, condition: 'Cloudy' },
    pointsEarned: 15000,
    date: '2026-02-17'
  },
  {
    id: '20',
    airline: 'British Airways',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/753/753314.png',
    origin: 'LHR',
    destination: 'EWR',
    departureTime: '10:45 AM',
    arrivalTime: '1:50 PM',
    duration: '8h 05m',
    price: 95000,
    class: 'Business',
    weather: { temp: 12, condition: 'Cloudy' },
    pointsEarned: 8200,
    date: '2026-02-17'
  },
  {
    id: '21',
    airline: 'Air India',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png',
    origin: 'DEL',
    destination: 'LHR',
    departureTime: '1:15 PM',
    arrivalTime: '5:30 PM',
    duration: '8h 45m',
    price: 65000,
    class: 'Economy',
    weather: { temp: 14, condition: 'Rainy' },
    pointsEarned: 5500,
    date: '2026-02-18'
  },
  {
    id: '22',
    airline: 'IndiGo',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Indigo_Logo.svg/1200px-Indigo_Logo.svg.png',
    origin: 'TRV',
    destination: 'MAA',
    departureTime: '7:00 AM',
    arrivalTime: '8:25 AM',
    duration: '1h 25m',
    price: 3400,
    class: 'Economy',
    weather: { temp: 31, condition: 'Sunny' },
    pointsEarned: 380,
    date: '2026-02-15'
  },
  {
    id: '23',
    airline: 'Akasa Air',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    origin: 'BOM',
    destination: 'CCU',
    departureTime: '1:30 PM',
    arrivalTime: '4:15 PM',
    duration: '2h 45m',
    price: 5800,
    class: 'Economy',
    weather: { temp: 25, condition: 'Cloudy' },
    pointsEarned: 620,
    date: '2026-02-15'
  },
  {
    id: '24',
    airline: 'Air India',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png',
    origin: 'DEL',
    destination: 'JFK',
    departureTime: '1:45 AM',
    arrivalTime: '7:30 AM',
    duration: '15h 15m',
    price: 145000,
    class: 'Business',
    weather: { temp: 5, condition: 'Clear' },
    pointsEarned: 9500,
    date: '2026-02-16'
  },
  {
    id: '25',
    airline: 'Vistara',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Vistara_logo.svg/1024px-Vistara_logo.svg.png',
    origin: 'BOM',
    destination: 'SIN',
    departureTime: '11:45 PM',
    arrivalTime: '7:45 AM',
    duration: '5h 30m',
    price: 32000,
    class: 'Business',
    weather: { temp: 30, condition: 'Rainy' },
    pointsEarned: 3500,
    date: '2026-02-17'
  },
  {
    id: '26',
    airline: 'Etihad Airways',
    airlineLogo: 'https://cdn-icons-png.flaticon.com/512/811/811631.png',
    origin: 'AUH',
    destination: 'CDG',
    departureTime: '2:15 AM',
    arrivalTime: '7:40 AM',
    duration: '7h 25m',
    price: 165000,
    class: 'First',
    weather: { temp: 18, condition: 'Sunny' },
    pointsEarned: 13500,
    date: '2026-02-18'
  },
  {
    id: '27',
    airline: 'IndiGo',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Indigo_Logo.svg/1200px-Indigo_Logo.svg.png',
    origin: 'DEL',
    destination: 'BLR',
    departureTime: '7:45 PM',
    arrivalTime: '10:30 PM',
    duration: '2h 45m',
    price: 4900,
    class: 'Economy',
    weather: { temp: 26, condition: 'Clear' },
    pointsEarned: 520,
    date: '2026-02-15'
  },
  {
    id: '28',
    airline: 'Air India',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png',
    origin: 'BOM',
    destination: 'HYD',
    departureTime: '8:00 AM',
    arrivalTime: '9:25 AM',
    duration: '1h 25m',
    price: 3600,
    class: 'Economy',
    weather: { temp: 30, condition: 'Sunny' },
    pointsEarned: 400,
    date: '2026-02-16'
  },
  {
    id: '29',
    airline: 'SpiceJet',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png',
    origin: 'BLR',
    destination: 'MAA',
    departureTime: '10:45 AM',
    arrivalTime: '11:45 AM',
    duration: '1h 00m',
    price: 2500,
    class: 'Economy',
    weather: { temp: 31, condition: 'Sunny' },
    pointsEarned: 280,
    date: '2026-02-17'
  },
  {
    id: '30',
    airline: 'Vistara',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Vistara_logo.svg/1024px-Vistara_logo.svg.png',
    origin: 'DEL',
    destination: 'MAA',
    departureTime: '6:30 PM',
    arrivalTime: '9:15 PM',
    duration: '2h 45m',
    price: 11500,
    class: 'Business',
    weather: { temp: 28, condition: 'Clear' },
    pointsEarned: 1500,
    date: '2026-02-15'
  }
];

function App() {
  const [flights] = useState<Flight[]>(MOCK_FLIGHTS);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activePage, setActivePage] = useState<string>('home');
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('skyreserve_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [successType, setSuccessType] = useState<'login' | 'booking'>('login');
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Economy' | 'Business' | 'First'>('All');
  const [searchParams, setSearchParams] = useState({ origin: '', destination: '', date: '' });
  const [bookings, setBookings] = useState<any[]>(() => {
    const saved = localStorage.getItem('skyreserve_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('skyreserve_user', JSON.stringify(userData));
    setSuccessType('login');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('skyreserve_user');
  };

  const filteredFlights = flights.filter(f => {
    const matchesFilter = activeFilter === 'All' || f.class === activeFilter;
    const matchesOrigin = !searchParams.origin || f.origin.toLowerCase().includes(searchParams.origin.toLowerCase());
    const matchesDest = !searchParams.destination || f.destination.toLowerCase().includes(searchParams.destination.toLowerCase());
    const matchesDate = !searchParams.date || f.date === searchParams.date;
    return matchesFilter && matchesOrigin && matchesDest && matchesDate;
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
    setSuccessType('booking');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter(b => b.bookingId !== id);
    setBookings(updated);
    localStorage.setItem('skyreserve_bookings', JSON.stringify(updated));
  };

  const handleHeroSearch = (params: { origin: string; destination: string; date: string }) => {
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
        onLogout={handleLogout}
        onPageChange={setActivePage}
        user={user}
      />

      <main>
        {activePage === 'home' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
            </motion.div>
          </AnimatePresence>
        )}

        {activePage === 'promotions' && <Promotions />}
        {activePage === 'privacy' && <InfoPage type="privacy" />}
        {activePage === 'terms' && <InfoPage type="terms" />}
        {activePage === 'support' && <InfoPage type="support" />}
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs rotate-45">✈️</span>
            </div>
            <span className="text-lg font-outfit font-bold text-white">SkyReserve</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 SkyReserve. Elevating your travel experience.</p>
          <div className="flex gap-6">
            <button onClick={() => setActivePage('privacy')} className="text-slate-400 hover:text-white transition-colors">Privacy</button>
            <button onClick={() => setActivePage('terms')} className="text-slate-400 hover:text-white transition-colors">Terms</button>
            <button onClick={() => setActivePage('support')} className="text-slate-400 hover:text-white transition-colors">Support</button>
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
            {successType === 'login' ? `Logged in as ${user?.name}` : 'Flight Booked Successfully!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

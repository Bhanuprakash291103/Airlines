import type { Flight } from '../types';

const INDIAN_AIRLINES = [
    { name: 'IndiGo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Indigo_Logo.svg/1200px-Indigo_Logo.svg.png' },
    { name: 'Air India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png' },
    { name: 'Vistara', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Vistara_logo.svg/1024px-Vistara_logo.svg.png' },
    { name: 'SpiceJet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png' },
    { name: 'Akasa Air', logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
];

const INTERNATIONAL_AIRLINES = [
    { name: 'Emirates', logo: 'https://cdn-icons-png.flaticon.com/512/811/811631.png' },
    { name: 'Qatar Airways', logo: 'https://cdn-icons-png.flaticon.com/512/811/811631.png' },
    { name: 'Singapore Airlines', logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { name: 'Lufthansa', logo: 'https://cdn-icons-png.flaticon.com/512/753/753314.png' },
    { name: 'British Airways', logo: 'https://cdn-icons-png.flaticon.com/512/753/753314.png' },
    { name: 'Delta Air Lines', logo: 'https://cdn-icons-png.flaticon.com/512/753/753314.png' },
    { name: 'Ethihad Airways', logo: 'https://cdn-icons-png.flaticon.com/512/811/811631.png' },
];

const STOP_TYPES: ('Non-stop' | '1 Stop' | '2 Stops')[] = ['Non-stop', '1 Stop', '2 Stops'];
const WEATHER_CONDITIONS: ('Sunny' | 'Cloudy' | 'Rainy' | 'Clear')[] = ['Sunny', 'Cloudy', 'Rainy', 'Clear'];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateTime = () => {
    const hours = getRandomInt(0, 23);
    const minutes = [0, 15, 30, 45][getRandomInt(0, 3)];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

const calculateArrival = (departure: string, durationMin: number) => {
    const [time, ampm] = departure.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const depDate = new Date();
    depDate.setHours(hours, minutes, 0, 0);

    const arrDate = new Date(depDate.getTime() + durationMin * 60000);
    const arrHours = arrDate.getHours();
    const arrMinutes = arrDate.getMinutes();
    const arrAmpm = arrHours >= 12 ? 'PM' : 'AM';
    const arrDisplayHours = arrHours % 12 || 12;

    const dayDiff = arrDate.getDate() - depDate.getDate();
    const dayStr = dayDiff > 0 ? ` +${dayDiff}` : '';

    return `${arrDisplayHours}:${arrMinutes.toString().padStart(2, '0')} ${arrAmpm}${dayStr}`;
};

const formatDuration = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
};

// Simple heuristic to detect if a location is in India
const isIndianLocation = (name: string) => {
    const indianKeywords = ['india', 'delhi', 'mumbai', 'bangalore', 'blr', 'bom', 'del', 'hyderabad', 'chennai', 'kolkata', 'pune', 'goa', 'kochi', 'amd', 'pune'];
    return indianKeywords.some(k => name.toLowerCase().includes(k));
};

export const generateFlights = (origin: string, destination: string, date: string): Flight[] => {
    const resultsCount = getRandomInt(8, 9);
    const flights: Flight[] = [];

    const isDomestic = isIndianLocation(origin) && isIndianLocation(destination);
    const airlines = isDomestic ? INDIAN_AIRLINES : [...INDIAN_AIRLINES, ...INTERNATIONAL_AIRLINES];

    for (let i = 0; i < resultsCount; i++) {
        const airline = airlines[getRandomInt(0, airlines.length - 1)];
        const stopType = i === 0 ? 'Non-stop' : STOP_TYPES[getRandomInt(0, 2)]; // Always at least one non-stop

        // Realistic duration based on domestic vs international
        let baseDuration = isDomestic ? getRandomInt(60, 240) : getRandomInt(300, 1200);
        if (stopType === '1 Stop') baseDuration += getRandomInt(120, 300);
        if (stopType === '2 Stops') baseDuration += getRandomInt(300, 600);

        // Realistic Pricing
        let basePrice = isDomestic ? getRandomInt(3000, 15000) : getRandomInt(40000, 150000);
        const currency = isDomestic ? 'INR' : 'USD';

        // If international currency is USD, scale it down
        if (currency === 'USD') {
            basePrice = Math.floor(basePrice / 83); // Simple conversion to simulate USD
        }

        const depTime = generateTime();
        const flightNum = `${airline.name.slice(0, 2).toUpperCase()} ${getRandomInt(100, 999)}`;

        const classes: ('Economy' | 'Business' | 'First')[] = ['Economy', 'Business', 'First'];
        const flightClass = classes[getRandomInt(0, 2)];

        // Adjust price by class
        const finalPrice = Math.floor(basePrice * (flightClass === 'Business' ? 2.5 : flightClass === 'First' ? 5 : 1));

        flights.push({
            id: Math.random().toString(36).substring(7),
            flightNumber: flightNum,
            airline: airline.name,
            airlineLogo: airline.logo,
            origin: origin.toUpperCase() || 'UNKNOWN',
            destination: destination.toUpperCase() || 'UNKNOWN',
            departureTime: depTime,
            arrivalTime: calculateArrival(depTime, baseDuration),
            duration: formatDuration(baseDuration),
            stops: stopType,
            price: finalPrice,
            priceCurrency: currency as 'INR' | 'USD',
            class: flightClass,
            weather: {
                temp: getRandomInt(15, 35),
                condition: WEATHER_CONDITIONS[getRandomInt(0, 3)]
            },
            pointsEarned: Math.floor(finalPrice / (currency === 'USD' ? 1 : 10)),
            date: date
        });
    }

    return flights;
};

export interface Flight {
    id: string;
    flightNumber: string;
    airline: string;
    airlineLogo: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    stops: 'Non-stop' | '1 Stop' | '2 Stops';
    price: number;
    priceCurrency: 'INR' | 'USD';
    class: 'Economy' | 'Business' | 'First';
    weather?: {
        temp: number;
        condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Clear';
    };
    pointsEarned?: number;
    date: string;
}

export interface SearchParams {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
}

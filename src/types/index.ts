export interface Flight {
    id: string;
    airline: string;
    airlineLogo: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
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

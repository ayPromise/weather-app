export interface WeatherAPIResponse {
    name: string;
    weather: Array<{
        main: string;
        id: number;
        icon: string;
        description: string;
    }>;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    wind: {
        speed: number;
    };
    visibility: number;
}


export interface WeatherAPIRequestParams {
    q?: string;
    lat?: number;
    lon?: number;
    units?: 'standard' | 'metric' | 'imperial';
}
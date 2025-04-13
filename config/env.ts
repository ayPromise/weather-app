export const env = {
    WEATHER_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API as string,
    WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
} as const;

if (!env.WEATHER_API_KEY) {
    throw new Error('NEXT_PUBLIC_OPENWEATHERMAP_API is not defined');
}
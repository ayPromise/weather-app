import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';
import { WeatherAPIResponse } from '@/types/weather';
import '@testing-library/jest-dom';
import MantineProvider from '@/providers/MantineProvider';

const mockWeatherData: WeatherAPIResponse = {
    name: 'Zhytomyr',
    weather: [{ main: 'Clear', id: 800, icon: '01d', description: 'sunny and warm' }],
    main: { temp: 23, feels_like: 22, humidity: 40, pressure: 1010 },
    wind: { speed: 3.5 },
    visibility: 10000
};

describe('WeatherCard component', () => {
    it('displays the weather data from the API', async () => {

        render(<MantineProvider>
            <WeatherCard data={mockWeatherData} />
        </MantineProvider>);

        expect(screen.getByText('Zhytomyr')).toBeInTheDocument();
        expect(screen.getByText('23.0°C')).toBeInTheDocument();
        expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
        expect(screen.getByText('40%')).toBeInTheDocument();
        expect(screen.getByText('1010 hPa')).toBeInTheDocument();
        expect(screen.getByText('10.0 km')).toBeInTheDocument();

        const image = screen.getByAltText('weather-icon');
        expect(image).toBeInTheDocument();
    });
});

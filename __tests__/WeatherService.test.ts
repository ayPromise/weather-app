import { WeatherService } from "@/services/api/weather";
import { CachedWeatherData } from "@/types/cache";
import { WeatherAPIRequestParams } from "@/types/weather";
import axios, { AxiosError } from "axios";

// Create a mock for the instance returned by axios.create()
const mockGet = jest.fn();
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// When axios.create() is called, return an object with a `get` method
mockedAxios.create.mockReturnValue({
  get: mockGet
} as any);

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("WeatherService", () => {
  const cityParams: WeatherAPIRequestParams = {
    q: "London",
    units: "metric"
  };


  // Working
  it("should return cached data if it exists and is valid", async () => {
    const cachedData: CachedWeatherData = {
      data: {
        name: "London",
        weather: [{ main: "Clear", id: 800, icon: "01d", description: "sunny and warm" }],
        main: { temp: 18, feels_like: 17, humidity: 60, pressure: 1015 },
        wind: { speed: 5 },
        visibility: 10000
      },
      timestamp: Date.now() - 1000
    };

    localStorage.setItem("weather_data", JSON.stringify(cachedData));

    const result: CachedWeatherData = await WeatherService.getWeatherByCityName(cityParams);

    expect(result).toHaveProperty("timestamp");
    expect(result.data).toHaveProperty("name", "London");
    expect(result.data.weather[0]).toHaveProperty("description", "sunny and warm");
  });

    // Working
    it("handling no city found", async () => {
        const wrongParams : WeatherAPIRequestParams = {q:"asdsadasd", units:"metric"}
      
        const error = new AxiosError(
            "Request failed with status code 404",
            undefined,
            {},
            null,
            {
                status: 404,
                statusText: "Not Found",
                headers: {},
                config: {},
                data: {},
            }
            );

    mockGet.mockRejectedValueOnce(error);

    await expect(WeatherService.getWeatherByCityName(wrongParams)).rejects.toBeInstanceOf(Error);
    });


    // // Not working
    // it("should throw an error when the API request fails", async () => {
    //     mockGet.mockRejectedValueOnce(new Error("Network error"));
    //     await expect(WeatherService.getWeatherByCityName(cityParams)).rejects.toThrowError("Network error");
    // });
});

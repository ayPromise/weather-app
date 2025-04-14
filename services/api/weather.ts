import axios, { AxiosInstance } from "axios";
import { env } from "@/config/env";
import { WeatherAPIRequestParams, WeatherAPIResponse } from "@/types/weather";
import { CachedWeatherData } from "@/types/cache";

const weatherAPI : AxiosInstance = axios.create({
    baseURL:env.WEATHER_API_URL,
    params:{
        appid:env.WEATHER_API_KEY
    }
})

const CACHE_KEY : string = 'weather_data'
const CACHE_LIFE : number = 5*60*1000; // 5 min


export class WeatherService {

    private static isCacheAlive(timestamp:number):boolean{
        const now = Date.now()
        return now - timestamp < CACHE_LIFE
    }

    private static setCache(data:WeatherAPIResponse) : void{
        const cacheItem : CachedWeatherData = {
            data,
            timestamp:Date.now()
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem))
    }

    private static getFromCache():CachedWeatherData|null{
        const cacheItem : string | null = localStorage.getItem(CACHE_KEY)
        
        if(!cacheItem) return null

        const parsedCacheItem : CachedWeatherData = JSON.parse(cacheItem)
        if(!this.isCacheAlive(parsedCacheItem.timestamp))
        {
            localStorage.removeItem(CACHE_KEY)
            return null
        }
        
        return parsedCacheItem
    }


    static async getWeatherByCityName(params:WeatherAPIRequestParams) : Promise<CachedWeatherData>{
        
        const cachedData = this.getFromCache();
        if (cachedData && cachedData.data.name === params.q) {
            return cachedData;
        }

        try{
            const response = await weatherAPI.get('/weather',{
                params:{
                    q:params.q,
                    units:params.units
                }
            })

            this.setCache(response.data as WeatherAPIResponse)

            return this.getFromCache() as CachedWeatherData
        }catch(error){
             if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new Error("City not found");
                } else if (error.response?.status === 401) {
                    throw new Error("Invalid API key");
                } else if (error.response?.status) {
                    throw new Error(`API error: ${error.response.status}`);
                }
                throw new Error("Network error or bad request");
            } else {
                throw new Error("Something went wrong");
            }
        }
    }
}
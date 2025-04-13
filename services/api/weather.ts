import axios, { AxiosInstance } from "axios";
import { env } from "@/config/env";
import { WeatherAPIRequestParams, WeatherAPIResponse } from "@/types/weather";
import { CacheItem } from "@/types/cache";

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
        const cacheItem : CacheItem = {
            data,
            timestamp:Date.now()
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheItem))
    }

    private static getFromCache():CacheItem|null{
        const cacheItem : string | null = localStorage.getItem(CACHE_KEY)
        
        if(!cacheItem) return null

        const parsedCacheItem : CacheItem = JSON.parse(cacheItem)
        if(!this.isCacheAlive(parsedCacheItem.timestamp))
        {
            localStorage.removeItem(CACHE_KEY)
            return null
        }
        
        return parsedCacheItem
    }


    static async getWeatherByCityName(params:WeatherAPIRequestParams) : Promise<WeatherAPIResponse>{
        
        const cachedData = this.getFromCache();
        if (cachedData) {
            return cachedData.data;
        }

        try{
            const {data} = await weatherAPI.get<WeatherAPIResponse>('/weather',{
                params:{
                    q:params.q,
                    units:params.units
                }
            })

            this.setCache(data)

            return data
        }catch(error){
            throw new Error("Error with getting weather data")
        }
    }
}
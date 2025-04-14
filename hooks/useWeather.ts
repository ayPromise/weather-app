import { WeatherService } from "@/services/api/weather";
import { CachedWeatherData } from "@/types/cache";
import { WeatherAPIRequestParams, WeatherAPIResponse } from "@/types/weather";
import { useEffect, useState } from "react";

export interface UseWeatherReturn{
    data: CachedWeatherData | null,
    loading:boolean,
    error:string | null,
    refetch:(params:WeatherAPIRequestParams)=>Promise<void>
}


const useWeather = (params:WeatherAPIRequestParams) : UseWeatherReturn=>{
    const [data, setData] = useState<CachedWeatherData|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)

    const fetchWeather = async (params:WeatherAPIRequestParams)=>{
        try{
            setLoading(true)
            const weatherData : CachedWeatherData = await WeatherService.getWeatherByCityName(params)
            setData(weatherData)
            setError(null)
        }catch(error){
            setError("No city was found")
            setData(null)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchWeather(params)
    },[params.q])

    return {data, loading, error, refetch:fetchWeather}
}

export default useWeather
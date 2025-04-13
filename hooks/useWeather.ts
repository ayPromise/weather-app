import { WeatherService } from "@/services/api/weather";
import { WeatherAPIRequestParams, WeatherAPIResponse } from "@/types/weather";
import { useEffect, useState } from "react";

export interface UseWeatherReturn{
    data: WeatherAPIResponse | null,
    loading:boolean,
    error:string | null,
    refetch:()=>Promise<void>
}


const useWeather = (params:WeatherAPIRequestParams) : UseWeatherReturn=>{
    const [data, setData] = useState<WeatherAPIResponse|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)

    const fetchWeather = async ()=>{
        try{
            setLoading(true)
            const weatherData : WeatherAPIResponse = await WeatherService.getWeatherByCityName(params)
            setData(weatherData)
            setError(null)
        }catch(error){
            setError(error instanceof Error ? error.message : "Some error in fetching weather")
            setData(null)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchWeather()
    },[params.q])

    return {data, loading, error, refetch:fetchWeather}
}

export default useWeather
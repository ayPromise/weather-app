"use client"

import ErrorNotification from "@/components/ErrorNotification";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import useWeather, { UseWeatherReturn } from "@/hooks/useWeather";
import { useState } from "react";

const Home = () => {
  const { data, error, refetch }: UseWeatherReturn = useWeather({
    q: "Brazil",
    units: "metric"
  })
  const [searchValue, setSearchValue] = useState<string>('')
  const [lastSearchValue, setLastSearchValue] = useState<string>('')

  const handleSubmit = () => {
    if (searchValue !== lastSearchValue) {
      refetch({ q: searchValue, units: "metric" })
      setLastSearchValue(searchValue)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  return (
    <div className="bg-gray-100 h-screen">
      <SearchBar value={searchValue} handleSubmit={handleSubmit} handleChange={handleChange} />
      {data && <WeatherCard cachedData={data} />}
      {error && <ErrorNotification message={error} />}
    </div>
  );
}

export default Home

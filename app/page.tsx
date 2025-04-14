"use client"

import ErrorMessage from "@/components/ErrorMessage";
import SearchBar from "@/components/SearchBar";
import SkeletonCard from "@/components/SkeletonCard";
import WeatherCard from "@/components/WeatherCard";
import useWeather, { UseWeatherReturn } from "@/hooks/useWeather";
import { useState } from "react";

export default function Home() {
  const { data, loading, error, refetch }: UseWeatherReturn = useWeather({
    q: "Brazil",
    units: "metric"
  })

  const [searchValue, setSearchValue] = useState<string>('')

  const handleSubmit = () => {
    if (searchValue)
      refetch({ q: searchValue, units: "metric" })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="bg-gray-100 h-screen">
      <SearchBar value={searchValue} handleSubmit={handleSubmit} handleChange={handleChange} />
      {data && <WeatherCard cachedData={data} />}
      {/* {loading && <SkeletonCard />} */}
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}

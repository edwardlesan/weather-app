"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import WeatherCard from "@/components/WeatherCard";

export interface WeatherDataProps {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  weather: {
    main: string;
    description: string;
  }[];
}

export default function Home() {
  const [city, setCity] = useState("dubai");
  const [weather, setWeather] = useState<WeatherDataProps | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-10 flex gap-10 items-center justify-center">
      <Button onClick={fetchWeather}>Test</Button>

      <WeatherCard data={weather} />
    </div>
  );
}

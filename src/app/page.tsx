"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import WeatherCard from "@/components/WeatherCard";
import Image from "next/image";

export interface WeatherDataProps {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  timezone: number;
  name: string;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export default function Home() {
  const [city, setCity] = useState("tokyo");
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
  console.log(weather);

  function selectImage(
    weatherDescription?: string,
    timezoneOffsetSeconds?: number
  ): string {
    if (timezoneOffsetSeconds === undefined) {
      timezoneOffsetSeconds = 0;
    }

    const currentTime = new Date(Date.now() + timezoneOffsetSeconds * 1000);
    const hour = currentTime.getHours();
    const isDayTime = hour >= 6 && hour < 18;

    switch (weatherDescription) {
      case "clear sky":
        return isDayTime ? "/clear_sky_day.jpg" : "/clear_sky_night.jpg";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return isDayTime ? "/day_clouds.jpg" : "/night_clouds.jpg";
      case "shower rain":
      case "rain":
        return isDayTime ? "/rain_day.jpg" : "/rain_night.jpg";
      case "thunderstorm":
        return isDayTime ? "/thunderstorm_day.jpg" : "/thunderstorm_night.jpg";
      case "snow":
        return isDayTime ? "/snow_day.jpg" : "/snow_night.jpg";
      case "mist":
        return isDayTime ? "/mist_day.jpg" : "/mist_night.jpg";
      default:
        return isDayTime ? "/clear_sky_day.jpg" : "/clear_sky_night.jpg";
    }
  }

  return (
    <div className="relative flex flex-col w-full h-dvh px-20">
      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black/20 backdrop-blur-sm" />
      <Image
        src={selectImage(weather?.weather[0].description, weather?.timezone)}
        layout="fill"
        className="object-cover z-0"
        alt="background-image"
      />

      <div className="relative z-20 py-4">
        <Button onClick={fetchWeather}>Test</Button>
      </div>

      <div className="relative z-20 flex-1 flex items-center w-full justify-end">
        <WeatherCard data={weather} />
      </div>
    </div>
  );
}

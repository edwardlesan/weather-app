import React from "react";
import { Card } from "./ui/card";
import { WeatherDataProps } from "@/app/page";

interface WeatherCardProps {
  data: WeatherDataProps | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <Card className="p-4">
      {data ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">{data.name}</h1>
            <p className="text-md font-medium text-gray-600">
              {data.weather[0].main}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Pressure: {data.main.pressure} hPa</p>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </Card>
  );
};

export default WeatherCard;
